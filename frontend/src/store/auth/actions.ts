import { createFetchAction } from '../utils';
import {
  SigninParams,
  SigninResponse,
  SignupParams,
  SignupResponse,
  GetRefreshTokenResponse,
  ChangeProfileParams,
} from '../../types';
export const signinAsync = createFetchAction<SigninParams, SigninResponse>('signin');
export const signupAsync = createFetchAction<SignupParams, SignupResponse>('signup');
export const signoutAsync = createFetchAction<void, void>('signout');
export const getRefreshTokenAsync = createFetchAction<void, GetRefreshTokenResponse>('getRefreshToken');
export const changeProfileAsync = createFetchAction<ChangeProfileParams, void>('changeProfile');
