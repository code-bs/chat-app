import { takeLatest } from 'redux-saga/effects';
import { createSaga } from '../utils';
import { signinAsync, signupAsync, signoutAsync } from './actions';
import { AuthApi } from '../../apis';
import { SigninParams, SigninResponse, SignupParams, SignupResponse } from '../../types';
import { history } from '../../router/history';
function* authSaga() {
  yield takeLatest(
    signinAsync.REQUEST,
    createSaga<SigninParams, SigninResponse>(signinAsync, AuthApi.signin, {
      onSuccess: () => {
        history.back();
      },
    }),
  );
  yield takeLatest(
    signupAsync.REQUEST,
    createSaga<SignupParams, SignupResponse>(signupAsync, AuthApi.signup, {
      onSuccess: () => {
        history.push('/signin');
      },
    }),
  );
  yield takeLatest(
    signoutAsync.REQUEST,
    createSaga<any, any>(signoutAsync, AuthApi.signout, {
      onSuccess: () => {
        history.push('/chat');
      },
    }),
  );
}
export default authSaga;
