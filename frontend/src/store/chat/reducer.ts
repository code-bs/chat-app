import { createReducer } from '@reduxjs/toolkit';
import { getChatRoomListAsync, createChatRoomAsync } from './actions';
import { GetChatRoomListResponse, CreateChatRoomResponse } from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  chatRoomList: createInitialState<GetChatRoomListResponse>(),
  createChatRoom: createInitialState<CreateChatRoomResponse>(),
};

export type ChatState = typeof initialState;

const chatReducer = createReducer(initialState, builder => {
  createPatialReducer<ChatState>(builder, 'chatRoomList', getChatRoomListAsync);
  createPatialReducer<ChatState>(builder, 'createChatRoom', createChatRoomAsync, (state, action) => {
    state.chatRoomList.data?.push(action.payload);
  });
});
export default chatReducer;
