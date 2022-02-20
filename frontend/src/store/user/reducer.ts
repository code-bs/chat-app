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
  friendList: createInitialState<any, GetFriendListResponse>(),
  findUser: createInitialState<FindUserParams, FindUserResponse>(),
  friendRequest: createInitialState<any, GetFriendRequestResponse>(),
  addFriend: createInitialState<AddFriendParams, any>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState>(builder, 'friendList', getFriendListAsync);
  createPatialReducer<UserState>(builder, 'findUser', findUserAsync);
  createPatialReducer<UserState>(builder, 'friendRequest', getFriendRequestAsync);
  createPatialReducer<UserState>(builder, 'addFriend', addFriendAsync, state => {
    const { senderId } = state.addFriend.payload as AddFriendParams;
    const nextFriendRequest = state.friendRequest.data as FindUserResponse;
    const nextFriendList = state.friendList.data as GetFriendListResponse;
    const target = nextFriendRequest.find(({ userId }) => userId === senderId) as User;
    state.friendList.data = [...nextFriendList, target];
    state.friendRequest.data = nextFriendRequest.filter(({ userId }) => senderId !== userId);
  });
});
export default userReducer;
