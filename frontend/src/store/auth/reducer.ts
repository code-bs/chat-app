import { createReducer } from '@reduxjs/toolkit';
import { signinAsync, signupAsync, signoutAsync, getRefreshTokenAsync, changeProfileAsync } from './actions';
import {
  SigninParams,
  SigninResponse,
  SignupParams,
  SignupResponse,
  GetRefreshTokenResponse,
  ChangeProfileParams,
} from '../../types';
import { createInitialState, createPatialReducer } from '../utils';
import { sendMessage } from '../socket';

const initialState = {
  signin: createInitialState<SigninParams, SigninResponse>(),
  signup: createInitialState<SignupParams, SignupResponse>(),
  signout: createInitialState<void, void>(),
  getRefreshToken: createInitialState<void, GetRefreshTokenResponse>(),
  changeProfile: createInitialState<ChangeProfileParams, void>(),
};

export type AuthState = typeof initialState;

const authReducer = createReducer(initialState, builder => {
  createPatialReducer<AuthState, SigninParams, SigninResponse>(builder, 'signin', signinAsync, (state, action) => {
    const { userId } = action.payload;
    sendMessage('login', { userId });
  });
  createPatialReducer<AuthState, SignupParams, SignupResponse>(builder, 'signup', signupAsync);
  createPatialReducer<AuthState, void, void>(builder, 'signout', signoutAsync, state => {
    state.signin.data = null;
  });
  createPatialReducer<AuthState, void, GetRefreshTokenResponse>(
    builder,
    'getRefreshToken',
    getRefreshTokenAsync,
    (state, action) => {
      state.signin.data = action.payload;
      sendMessage('login', { userId: action.payload.user.userId });
    },
  );
  createPatialReducer<AuthState, ChangeProfileParams, void>(builder, 'changeProfile', changeProfileAsync, state => {
    const data = state.signin.data as SigninResponse;
    const { user } = data;
    state.signin.data = {
      ...data,
      user: {
        ...user,
        ...state.changeProfile.payload,
      },
    };
  });
});
export default authReducer;
