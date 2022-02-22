import { createFetchAction } from '../utils';

export const signinAsync = createFetchAction('signin');
export const signupAsync = createFetchAction('signup');
export const signoutAsync = createFetchAction('signout');
export const getRefreshTokenAsync = createFetchAction('getRefreshToken');
export const changeProfileAsync = createFetchAction('changeProfile');
