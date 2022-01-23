import { createReducer } from '@reduxjs/toolkit';
import { getChatRoomListAsync } from './actions';
import { GetChatRoomListResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  chatRoomList: createInitialState<GetChatRoomListResponse>(),
};

export type ChatState = typeof initialState;

const chatReducer = createReducer(initialState, builder => {
  createPatialReducer<ChatState>(builder, 'chatRoomList', getChatRoomListAsync);
});
export default chatReducer;
