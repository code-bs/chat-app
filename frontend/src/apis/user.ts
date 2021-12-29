import endpoint from './endpoint';
import { SigninParams, SignupParams } from '../types';

const signin = async ({ userId, password }: SigninParams) => {
  const response: any = await endpoint.post('/auth/login', { userId, password });
  console.log(response);
};

const signup = async ({ userId, password }: SignupParams) => {
  const response: any = await endpoint.post('/user', { userId, password });
  console.log(response);
};

export { signin, signup };
