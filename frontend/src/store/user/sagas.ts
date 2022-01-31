import { takeLatest } from 'redux-saga/effects';
import { UserApi } from '../../apis';
import { createSaga } from '../utils';
import { getFriendListAsync } from './actions';
import { GetFriendListParams, GetFriendListResponse } from '../../types';

function* userSaga() {
  yield takeLatest(
    getFriendListAsync.REQUEST,
    createSaga<GetFriendListParams, GetFriendListResponse>(getFriendListAsync, UserApi.getFriendList),
  );
}

export default userSaga;
