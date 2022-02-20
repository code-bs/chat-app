import endpoint from './endpoint';
import { SigninParams, SignupParams, SignupResponse, SigninResponse, GetRefreshTokenResponse } from '../types';

const signin = async ({ userId, password }: SigninParams): Promise<SigninResponse> => {
  const { data } = await endpoint.post('/auth/login', { userId, password });
  const { accessToken } = data;
  onSigninSuccess(accessToken);
  return data;
};

const signup = async (signupParams: SignupParams): Promise<SignupResponse> => {
  const { data } = await endpoint.post('/auth', signupParams);
  return data;
};

const signout = async () => {
  await endpoint.get('/auth/logout');
  delete endpoint.defaults.headers.common['access_token'];
};

const getRefreshToken = async (): Promise<GetRefreshTokenResponse> => {
  const { data } = await endpoint.get('/auth/refresh_token');
  const { accessToken } = data;
  onSigninSuccess(accessToken);
  return data;
};

const onSigninSuccess = (accessToken: string) => {
  endpoint.defaults.headers.common['access_token'] = accessToken;
};

export { signin, signup, signout, getRefreshToken };
