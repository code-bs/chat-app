import endpoint from './endpoint';
import { AllChatRoomResponse, CreateChatRoomResponse, CreateChatRoomParams } from '../types';

const getChatRoomList = async () => {
  const response: AllChatRoomResponse = await endpoint.get('/chat/room');
  const { data } = response;
  return data;
};

const createChatRoom = async ({ roomName, userId }: CreateChatRoomParams) => {
  const response: CreateChatRoomResponse = await endpoint.post('/chat/room', { roomName, userId });
  const { data } = response;
  return data;
};

export { getChatRoomList, createChatRoom };
