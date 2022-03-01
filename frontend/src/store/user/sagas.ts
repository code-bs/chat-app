import { takeLatest } from 'redux-saga/effects';
import { UserApi } from '../../apis';
import { createSaga } from '../utils';
import { getFriendListAsync, searchUserAsync, getFriendRequestAsync, acceptFriendRequestAsync } from './actions';
import {
  GetFriendListResponse,
  SearchUserParams,
  SearchUserResponse,
  GetFriendRequestResponse,
  AcceptFriendRequestParams,
} from '../../types';

function* userSaga() {
  yield takeLatest(
    getFriendListAsync.REQUEST,
    createSaga<void, GetFriendListResponse>(getFriendListAsync, UserApi.getFriendList),
  );
  yield takeLatest(
    searchUserAsync.REQUEST,
    createSaga<SearchUserParams, SearchUserResponse>(searchUserAsync, UserApi.searchUser),
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
