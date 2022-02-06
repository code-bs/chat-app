import { createReducer } from '@reduxjs/toolkit';
import { getFriendListAsync, findUserAsync, getFriendRequestAsync, addFriendAsync } from './actions';
import {
  GetFriendListParams,
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestParams,
  GetFriendRequestResponse,
  AddFriendParams,
} from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  friendList: createInitialState<GetFriendListParams, GetFriendListResponse>(),
  findUser: createInitialState<FindUserParams, FindUserResponse>(),
  friendRequest: createInitialState<GetFriendRequestParams, GetFriendRequestResponse>(),
  addFriend: createInitialState<AddFriendParams, any>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState>(builder, 'friendList', getFriendListAsync);
  createPatialReducer<UserState>(builder, 'findUser', findUserAsync);
  createPatialReducer<UserState>(builder, 'friendRequest', getFriendRequestAsync);
  createPatialReducer<UserState>(builder, 'addFriend', addFriendAsync, state => {
    const { friendId } = state.addFriend.payload as AddFriendParams;
    const nextFriendRequest = state.friendRequest.data as FindUserResponse;
    state.friendRequest.data = nextFriendRequest.filter(({ userId }) => friendId !== userId);
  });
});
export default userReducer;
