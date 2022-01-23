import endpoint from './endpoint';
import { SigninParams, SignupParams, SignupResponse, SigninResponse } from '../types';

const signin = async ({ userId, password }: SigninParams): Promise<SigninResponse> => {
  const { data } = await endpoint.post('/auth/login', { userId, password });
  const { accessToken } = data;
  endpoint.defaults.headers.common['access_token'] = accessToken;
  return data;
};

const signup = async ({ userId, password, nickname }: SignupParams): Promise<SignupResponse> => {
  const { data } = await endpoint.post('/auth', { userId, password, nickname });
  return data;
};

export { signin, signup };
