import endpoint from './endpoint';
import { AllChatRoomResponse, CreateChatRoomResponse, CreateChatRoomParams, GetChatRoomListParams } from '../types';

const getChatRoomList = async ({ userId }: GetChatRoomListParams) => {
  const response: AllChatRoomResponse = await endpoint.get(`/chat/room/${userId}`);
  const { data } = response;
  return data;
};

const createChatRoom = async ({ roomName, userId }: CreateChatRoomParams) => {
  const response: CreateChatRoomResponse = await endpoint.post('/chat/room', { roomName, userId });
  const { data } = response;
  return data;
};

export { getChatRoomList, createChatRoom };
