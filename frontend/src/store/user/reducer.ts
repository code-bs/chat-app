import { createReducer } from '@reduxjs/toolkit';
import { getFriendListAsync, findUserAsync, getFriendRequestAsync } from './actions';
import { GetFriendListResponse, FindUserResponse, GetFriendRequestResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  friendList: createInitialState<GetFriendListResponse>(),
  findUser: createInitialState<FindUserResponse>(),
  friendRequest: createInitialState<GetFriendRequestResponse>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState>(builder, 'friendList', getFriendListAsync);
  createPatialReducer<UserState>(builder, 'findUser', findUserAsync);
  createPatialReducer<UserState>(builder, 'friendRequest', getFriendRequestAsync);
});
export default userReducer;
