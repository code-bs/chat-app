import { createAction } from '@reduxjs/toolkit';
import { createFetchAction } from '../utils';
import {
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  GetRoomInviteResponse,
  JoinChatRoomParams,
  Message,
} from '../../types';
export const getChatRoomListAsync = createFetchAction<void, GetChatRoomListResponse>('getChatRoomList');
export const createChatRoomAsync = createFetchAction<CreateChatRoomParams, CreateChatRoomResponse>('createChatRoom');
export const recieveMessage = createAction<Message>('recieveMessage');
export const getRoomInviteAsync = createFetchAction<void, GetRoomInviteResponse>('getRoomInvite');
export const joinChatRoomAsync = createFetchAction<JoinChatRoomParams, void>('joinChatRoom');
