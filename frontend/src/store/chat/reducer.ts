import { createReducer } from '@reduxjs/toolkit';
import { getChatRoomListAsync, createChatRoomAsync, recieveMessage } from './actions';
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
  builder.addCase(recieveMessage, (state, action) => {
    const { roomId, message, userId } = action.payload;
    const index = state.chatRoomList.data?.findIndex(room => room._id === roomId) || -1;
    if (index >= 0 && state.chatRoomList.data)
      state.chatRoomList.data[index].chatHistory.push({ message, userId, regDate: new Date().toString() });
  });
});
export default chatReducer;
