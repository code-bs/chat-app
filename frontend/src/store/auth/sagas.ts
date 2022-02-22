import { takeLatest } from 'redux-saga/effects';
import { createSaga } from '../utils';
import { signinAsync, signupAsync, signoutAsync, getRefreshTokenAsync, changeProfileAsync } from './actions';
import { AuthApi, UserApi } from '../../apis';
import {
  SigninParams,
  SigninResponse,
  SignupParams,
  SignupResponse,
  GetRefreshTokenResponse,
  ChangeProfileParams,
} from '../../types';
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
        history.back();
      },
    }),
  );
  yield takeLatest(
    getRefreshTokenAsync.REQUEST,
    createSaga<any, GetRefreshTokenResponse>(getRefreshTokenAsync, AuthApi.getRefreshToken, {
      onSuccess: () => {
        history.push('/chat');
      },
    }),
  );
  yield takeLatest(
    changeProfileAsync.REQUEST,
    createSaga<ChangeProfileParams, void>(changeProfileAsync, UserApi.changeProfile),
  );
}
export default authSaga;
