import endpoint from './endpoint';
import { SigninParams, SignupParams } from '../types';

const signin = async ({ userId, password }: SigninParams) => {
  const { data } = await endpoint.post('/auth/login', { userId, password });
  const { accessToken } = data;
  endpoint.defaults.headers.common['access_token'] = accessToken;
  return data;
};

const signup = async ({ userId, password, nickname }: SignupParams) => {
  await endpoint.post('/auth', { userId, password, nickname });
};

export { signin, signup };
