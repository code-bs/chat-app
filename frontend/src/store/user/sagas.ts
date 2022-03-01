import { takeLatest } from 'redux-saga/effects';
import { UserApi } from '../../apis';
import { createSaga } from '../utils';
import { getFriendListAsync, findUserAsync, getFriendRequestAsync, acceptFriendRequestAsync } from './actions';
import {
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestResponse,
  AcceptFriendRequestParams,
} from '../../types';

function* userSaga() {
  yield takeLatest(
    getFriendListAsync.REQUEST,
    createSaga<void, GetFriendListResponse>(getFriendListAsync, UserApi.getFriendList),
  );
  yield takeLatest(
    findUserAsync.REQUEST,
    createSaga<FindUserParams, FindUserResponse>(findUserAsync, UserApi.findUser),
  );
  yield takeLatest(
    getFriendRequestAsync.REQUEST,
    createSaga<void, GetFriendRequestResponse>(getFriendRequestAsync, UserApi.getFriendRequest),
  );
  yield takeLatest(
    acceptFriendRequestAsync.REQUEST,
    createSaga<AcceptFriendRequestParams, void>(acceptFriendRequestAsync, UserApi.acceptFriendRequest),
  );
}

export default userSaga;
