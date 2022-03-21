import { createReducer } from '@reduxjs/toolkit';
import {
  getChatRoomListAsync,
  createChatRoomAsync,
  recieveMessage,
  getRoomInviteAsync,
  joinChatRoomAsync,
  denyRoomInviteAsync,
} from './actions';
import {
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  GetRoomInviteResponse,
  JoinChatRoomParams,
  DenyRoomInviteParams,
} from '../../types';
import { createInitialState, createPatialReducer } from '../utils';
import { sendMessage } from '../socket';

const initialState = {
  chatRoomList: createInitialState<void, GetChatRoomListResponse>(),
  createChatRoom: createInitialState<CreateChatRoomParams, CreateChatRoomResponse>(),
  roomInvite: createInitialState<void, GetRoomInviteResponse>(),
  joinChatRoom: createInitialState<JoinChatRoomParams, void>(),
  denyRoomInvite: createInitialState<DenyRoomInviteParams, void>(),
};

export type ChatState = typeof initialState;

const chatReducer = createReducer(initialState, builder => {
  createPatialReducer<ChatState, void, GetChatRoomListResponse>(
    builder,
    'chatRoomList',
    getChatRoomListAsync,
    (state, action) => {
      const chatRoomList = action.payload as GetChatRoomListResponse;
      chatRoomList.forEach(({ _id }) => {
        console.log(_id);
        sendMessage('enterRoom', _id);
      });
      state.chatRoomList.data = chatRoomList;
    },
  );
  createPatialReducer<ChatState, CreateChatRoomParams, CreateChatRoomResponse>(
    builder,
    'createChatRoom',
    createChatRoomAsync,
    (state, action) => {
      state.chatRoomList.data?.push(action.payload);
    },
  );
  createPatialReducer<ChatState, void, GetRoomInviteResponse>(builder, 'roomInvite', getRoomInviteAsync);
  builder.addCase(recieveMessage, (state, action) => {
    const { roomId, message, userId } = action.payload;
    const index = state.chatRoomList.data?.findIndex(room => room._id === roomId) || -1;
    if (index >= 0 && state.chatRoomList.data)
      state.chatRoomList.data[index].chatHistory.push({ message, userId, regDate: new Date().toString() });
  });
  createPatialReducer<ChatState, JoinChatRoomParams, void>(builder, 'joinChatRoom', joinChatRoomAsync, state => {
    const { roomId } = state.joinChatRoom.payload as JoinChatRoomParams;
    const roomInvite = state.roomInvite.data as GetRoomInviteResponse;
    const target = roomInvite.find(({ room }) => room._id === roomId);
    state.roomInvite.data = roomInvite.filter(({ room }) => room._id !== roomId);
    if (target) {
      state.chatRoomList.data?.push(target.room);
    }
  });
  createPatialReducer<ChatState, DenyRoomInviteParams, void>(builder, 'denyRoomInvite', denyRoomInviteAsync, state => {
    const { roomId } = state.denyRoomInvite.payload as DenyRoomInviteParams;
    const roomInvite = state.roomInvite.data as GetRoomInviteResponse;
    state.roomInvite.data = roomInvite.filter(({ room }) => room._id !== roomId);
  });
});
export default chatReducer;
