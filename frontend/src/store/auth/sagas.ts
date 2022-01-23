import { takeLatest } from 'redux-saga/effects';
import { createSaga } from '../utils';
import { signinAsync, signupAsync } from './actions';
import { AuthApi } from '../../apis';
import { SigninParams, SigninResponse, SignupParams, SignupResponse } from '../../types';
import { history } from '../../router/history';
function* authSaga() {
  yield takeLatest(
    signinAsync.REQUEST,
    createSaga<SigninParams, SigninResponse>(signinAsync, AuthApi.signin, () => {
      history.push('/');
    }),
  );
  yield takeLatest(
    signinAsync.REQUEST,
    createSaga<SignupParams, SignupResponse>(signupAsync, AuthApi.signup, () => {
      history.push('/signin');
    }),
  );
}
export default authSaga;
