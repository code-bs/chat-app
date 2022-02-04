import endpoint from './endpoint';
import { GetChatRoomListResponse, CreateChatRoomResponse, CreateChatRoomParams, GetChatRoomListParams } from '../types';

const getChatRoomList = async ({ userId }: GetChatRoomListParams): Promise<GetChatRoomListResponse> => {
  const response = await endpoint.get(`/chat/room/${userId}`);
  const { data } = response;
  return data;
};

const createChatRoom = async ({ roomName, userId }: CreateChatRoomParams): Promise<CreateChatRoomResponse> => {
  const response = await endpoint.post('/chat/room', { roomName, userId });
  const { data } = response;
  return data;
};

export { getChatRoomList, createChatRoom };
