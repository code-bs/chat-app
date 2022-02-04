import { createAction } from '@reduxjs/toolkit';
import { createFetchAction } from '../utils';
import { Message } from '../../types';

export const getChatRoomListAsync = createFetchAction('getChatRoomList');
export const createChatRoomAsync = createFetchAction('createChatRoom');
export const recieveMessage = createAction<Message>('recieveMessage');
