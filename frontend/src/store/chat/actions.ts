import { createFetchAction } from '../utils';

export const getChatRoomListAsync = createFetchAction('getChatRoomList');
export const createChatRoomAsync = createFetchAction('createChatRoom');
