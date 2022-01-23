import { createReducer } from '@reduxjs/toolkit';
import { signinAsync, signupAsync } from './actions';
import { SigninResponse, SignupResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  signin: createInitialState<SigninResponse>(),
  signup: createInitialState<SignupResponse>(),
};

export type AuthState = typeof initialState;

const authReducer = createReducer(initialState, builder => {
  createPatialReducer<AuthState>(builder, 'signin', signinAsync);
  createPatialReducer<AuthState>(builder, 'signup', signupAsync);
});
export default authReducer;
