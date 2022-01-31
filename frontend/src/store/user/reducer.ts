import { createReducer } from '@reduxjs/toolkit';
import { getFriendListAsync } from './actions';
import { GetFriendListResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  friendList: createInitialState<GetFriendListResponse>(),
};

export type UserState = typeof initialState;

const userReducer = createReducer(initialState, builder => {
  createPatialReducer<UserState>(builder, 'friendList', getFriendListAsync);
});
export default userReducer;
