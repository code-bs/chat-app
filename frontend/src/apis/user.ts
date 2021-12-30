import endpoint from './endpoint';
import { SigninParams, SignupParams } from '../types';

const signin = async ({ userId, password }: SigninParams) => {
  try {
    const response: any = await endpoint.post('/auth/login', { userId, password });
    console.log(response);
  } catch (e: any) {
    console.log(e.message);
  }
};

const signup = async ({ userId, password, nickname }: SignupParams) => {
  try {
    const response: any = await endpoint.post('/user', { userId, password, nickname });
    console.log(response);
  } catch (e: any) {
    console.log(e.message);
  }
};

export { signin, signup };
