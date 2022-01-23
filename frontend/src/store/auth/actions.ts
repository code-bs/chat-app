import { createFetchAction } from '../utils';

export const signinAsync = createFetchAction('signin');
export const signupAsync = createFetchAction('signup');
