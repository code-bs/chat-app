import { createReducer } from '@reduxjs/toolkit';
import { getFriendListAsync, findUserAsync, getFriendRequestAsync, addFriendAsync } from './actions';
import {
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestResponse,
  AddFriendParams,
  User,
} from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  friendList: createInitialState<void, GetFriendListResponse>(),
  findUser: createInitialState<FindUserParams, FindUserResponse>(),
  friendRequest: createInitialState<void, GetFriendRequestResponse>(),
  addFriend: createInitialState<AddFriendParams, void>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState, void, GetFriendListResponse>(builder, 'friendList', getFriendListAsync);
  createPatialReducer<UserState, FindUserParams, FindUserResponse>(builder, 'findUser', findUserAsync);
  createPatialReducer<UserState, void, GetFriendRequestResponse>(builder, 'friendRequest', getFriendRequestAsync);
  createPatialReducer<UserState, AddFriendParams, void>(builder, 'addFriend', addFriendAsync, state => {
    const { senderId } = state.addFriend.payload as AddFriendParams;
    const nextFriendRequest = state.friendRequest.data as FindUserResponse;
    const nextFriendList = state.friendList.data as GetFriendListResponse;
    const target = nextFriendRequest.find(({ userId }) => userId === senderId) as User;
    state.friendList.data = [...nextFriendList, target];
    state.friendRequest.data = nextFriendRequest.filter(({ userId }) => senderId !== userId);
  });
});
export default userReducer;
