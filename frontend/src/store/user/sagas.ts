import { takeLatest } from 'redux-saga/effects';
import { UserApi } from '../../apis';
import { createSaga } from '../utils';
import { getFriendListAsync, findUserAsync } from './actions';
import { GetFriendListParams, GetFriendListResponse, FindUserParams, FindUserResponse } from '../../types';

function* userSaga() {
  yield takeLatest(
    getFriendListAsync.REQUEST,
    createSaga<GetFriendListParams, GetFriendListResponse>(getFriendListAsync, UserApi.getFriendList),
  );
  yield takeLatest(
    findUserAsync.REQUEST,
    createSaga<FindUserParams, FindUserResponse>(findUserAsync, UserApi.findUser),
  );
}

export default userSaga;
