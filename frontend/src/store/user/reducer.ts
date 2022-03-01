import { createReducer } from '@reduxjs/toolkit';
import {
  getFriendListAsync,
  searchUserAsync,
  getFriendRequestAsync,
  acceptFriendRequestAsync,
  denyFriendRequestAsync,
} from './actions';
import {
  GetFriendListResponse,
  SearchUserParams,
  SearchUserResponse,
  GetFriendRequestResponse,
  AcceptFriendRequestParams,
  DenyFriendRequestParams,
  User,
} from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  friendList: createInitialState<void, GetFriendListResponse>(),
  searchUser: createInitialState<SearchUserParams, SearchUserResponse>(),
  friendRequest: createInitialState<void, GetFriendRequestResponse>(),
  acceptFriendRequest: createInitialState<AcceptFriendRequestParams, void>(),
  denyFriendRequest: createInitialState<DenyFriendRequestParams, void>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState, void, GetFriendListResponse>(builder, 'friendList', getFriendListAsync);
  createPatialReducer<UserState, SearchUserParams, SearchUserResponse>(builder, 'searchUser', searchUserAsync);
  createPatialReducer<UserState, void, GetFriendRequestResponse>(builder, 'friendRequest', getFriendRequestAsync);
  createPatialReducer<UserState, AcceptFriendRequestParams, void>(
    builder,
    'acceptFriendRequest',
    acceptFriendRequestAsync,
    state => {
      const { senderId } = state.acceptFriendRequest.payload as AcceptFriendRequestParams;
      const nextFriendRequest = state.friendRequest.data as SearchUserResponse;
      const nextFriendList = state.friendList.data as GetFriendListResponse;
      const target = nextFriendRequest.find(({ userId }) => userId === senderId) as User;
      state.friendList.data = [...nextFriendList, target];
      state.friendRequest.data = nextFriendRequest.filter(({ userId }) => senderId !== userId);
    },
  );
  createPatialReducer<UserState, DenyFriendRequestParams, void>(
    builder,
    'denyFriendRequest',
    denyFriendRequestAsync,
    state => {
      const { senderId } = state.denyFriendRequest.payload as DenyFriendRequestParams;
      const nextFriendRequest = state.friendRequest.data as SearchUserResponse;
      state.friendRequest.data = nextFriendRequest.filter(({ userId }) => senderId !== userId);
    },
  );
});
export default userReducer;
