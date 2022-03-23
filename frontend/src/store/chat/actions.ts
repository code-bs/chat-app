import { createAction } from '@reduxjs/toolkit';
import { createFetchAction } from '../utils';
import {
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  GetRoomInviteResponse,
  JoinChatRoomParams,
  Message,
  DenyRoomInviteParams,
} from '../../types';
export const getChatRoomListAsync = createFetchAction<void, GetChatRoomListResponse>('getChatRoomList');
export const createChatRoomAsync = createFetchAction<CreateChatRoomParams, CreateChatRoomResponse>('createChatRoom');
export const sendMessage = createAction<Message>('sendMessage');
export const recieveMessage = createAction<Message>('recieveMessage');
export const getRoomInviteAsync = createFetchAction<void, GetRoomInviteResponse>('getRoomInvite');
export const joinChatRoomAsync = createFetchAction<JoinChatRoomParams, void>('joinChatRoom');
export const denyRoomInviteAsync = createFetchAction<DenyRoomInviteParams, void>('denyRoomInvite');
