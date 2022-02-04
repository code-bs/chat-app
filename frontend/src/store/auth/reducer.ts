import { createReducer } from '@reduxjs/toolkit';
import { signinAsync, signupAsync, signoutAsync, getRefreshTokenAsync } from './actions';
import { SigninResponse, SignupResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  signin: createInitialState<SigninResponse>(),
  signup: createInitialState<SignupResponse>(),
  signout: createInitialState<any>(),
  getRefreshToken: createInitialState<any>(),
};

export type AuthState = typeof initialState;

const authReducer = createReducer(initialState, builder => {
  createPatialReducer<AuthState>(builder, 'signin', signinAsync);
  createPatialReducer<AuthState>(builder, 'signup', signupAsync);
  createPatialReducer<AuthState>(builder, 'signout', signoutAsync, state => {
    state.signin.data = null;
  });
  createPatialReducer<AuthState>(builder, 'getRefreshToken', getRefreshTokenAsync, (state, action) => {
    state.signin.data = action.payload;
  });
});
export default authReducer;
