import { takeLatest } from 'redux-saga/effects';
import { UserApi } from '../../apis';
import { createSaga } from '../utils';
import { getFriendListAsync, findUserAsync, getFriendRequestAsync } from './actions';
import {
  GetFriendListParams,
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestParams,
  GetFriendRequestResponse,
} from '../../types';

function* userSaga() {
  yield takeLatest(
    getFriendListAsync.REQUEST,
    createSaga<GetFriendListParams, GetFriendListResponse>(getFriendListAsync, UserApi.getFriendList),
  );
  yield takeLatest(
    findUserAsync.REQUEST,
    createSaga<FindUserParams, FindUserResponse>(findUserAsync, UserApi.findUser),
  );
  yield takeLatest(
    getFriendRequestAsync.REQUEST,
    createSaga<GetFriendRequestParams, GetFriendRequestResponse>(getFriendRequestAsync, UserApi.getFriendRequest),
  );
}

export default userSaga;
