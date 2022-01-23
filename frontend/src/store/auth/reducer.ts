import { createReducer } from '@reduxjs/toolkit';
import { signinAsync } from './actions';
import { SigninResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  signin: createInitialState<SigninResponse>(),
  signup: createInitialState<null>(),
};

export type AuthState = typeof initialState;

const authReducer = createReducer(initialState, builder => {
  createPatialReducer<AuthState>(builder, 'signin', signinAsync);
});
export default authReducer;
