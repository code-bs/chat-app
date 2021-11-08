import endpoint from './endpoint';
import { AllChatRoomResponse } from '../types';

const getChatRoomList = async () => {
  const response: AllChatRoomResponse = await endpoint.get('/chat/room');
  return response;
};

export { getChatRoomList };
