import { takeLatest } from 'redux-saga/effects';
import { UserApi } from '../../apis';
import { createSaga } from '../utils';
import { getFriendListAsync, findUserAsync, getFriendRequestAsync, addFriendAsync } from './actions';
import {
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestResponse,
  AddFriendParams,
} from '../../types';

function* userSaga() {
  yield takeLatest(
    getFriendListAsync.REQUEST,
    createSaga<any, GetFriendListResponse>(getFriendListAsync, UserApi.getFriendList),
  );
  yield takeLatest(
    findUserAsync.REQUEST,
    createSaga<FindUserParams, FindUserResponse>(findUserAsync, UserApi.findUser),
  );
  yield takeLatest(
    getFriendRequestAsync.REQUEST,
    createSaga<any, GetFriendRequestResponse>(getFriendRequestAsync, UserApi.getFriendRequest),
  );
  yield takeLatest(addFriendAsync.REQUEST, createSaga<AddFriendParams, any>(addFriendAsync, UserApi.addFriend));
}

export default userSaga;
