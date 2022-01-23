import { takeEvery, takeLatest } from 'redux-saga/effects';
import { createSaga } from '../utils';
import { signinAsync } from './actions';
import { AuthApi } from '../../apis';
import { SigninParams, SigninResponse } from '../../types';
import { history } from '../../router/history';
function* authSaga() {
  yield takeEvery(
    signinAsync.REQUEST,
    createSaga<SigninParams, SigninResponse>(signinAsync, AuthApi.signin, () => {
      history.push('/');
    }),
  );
}
export default authSaga;
