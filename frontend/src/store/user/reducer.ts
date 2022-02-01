import { createReducer } from '@reduxjs/toolkit';
import { getFriendListAsync, findUserAsync } from './actions';
import { GetFriendListResponse, FindUserResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  friendList: createInitialState<GetFriendListResponse>(),
  findUser: createInitialState<FindUserResponse>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState>(builder, 'friendList', getFriendListAsync);
  createPatialReducer<UserState>(builder, 'findUser', findUserAsync);
});
export default userReducer;
