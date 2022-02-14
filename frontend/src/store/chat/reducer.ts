import { createReducer } from '@reduxjs/toolkit';
import {
  getChatRoomListAsync,
  createChatRoomAsync,
  recieveMessage,
  getRoomInviteAsync,
  joinChatRoomAsync,
} from './actions';
import {
  GetChatRoomListParams,
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  GetRoomInviteParams,
  GetRoomInviteResponse,
  JoinChatRoomParams,
  ChatRoomInfo,
} from '../../types';
import { createInitialState, createPatialReducer } from '../utils';

const initialState = {
  chatRoomList: createInitialState<GetChatRoomListParams, GetChatRoomListResponse>(),
  createChatRoom: createInitialState<CreateChatRoomParams, CreateChatRoomResponse>(),
  roomInvite: createInitialState<GetRoomInviteParams, GetRoomInviteResponse>(),
  joinChatRoom: createInitialState<JoinChatRoomParams, any>(),
};

export type ChatState = typeof initialState;

const chatReducer = createReducer(initialState, builder => {
  createPatialReducer<ChatState>(builder, 'chatRoomList', getChatRoomListAsync);
  createPatialReducer<ChatState>(builder, 'createChatRoom', createChatRoomAsync, (state, action) => {
    state.chatRoomList.data?.push(action.payload);
  });
  createPatialReducer<ChatState>(builder, 'roomInvite', getRoomInviteAsync);
  builder.addCase(recieveMessage, (state, action) => {
    const { roomId, message, userId } = action.payload;
    const index = state.chatRoomList.data?.findIndex(room => room._id === roomId) || -1;
    if (index >= 0 && state.chatRoomList.data)
      state.chatRoomList.data[index].chatHistory.push({ message, userId, regDate: new Date().toString() });
  });
  createPatialReducer<ChatState>(builder, 'joinChatRoom', joinChatRoomAsync, state => {
    const { roomId } = state.joinChatRoom.payload as JoinChatRoomParams;
    const roomInvite = state.roomInvite.data as GetRoomInviteResponse;
    const target = roomInvite.find(room => room._id === roomId) as ChatRoomInfo;
    state.roomInvite.data = roomInvite.filter(room => room._id !== roomId);
    state.chatRoomList.data?.push(target);
  });
});
export default chatReducer;
