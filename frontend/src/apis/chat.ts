import endpoint from './endpoint';
import {
  GetChatRoomListResponse,
  CreateChatRoomResponse,
  CreateChatRoomParams,
  GetRoomInviteResponse,
  JoinChatRoomParams,
} from '../types';

const getChatRoomList = async (): Promise<GetChatRoomListResponse> => {
  const response = await endpoint.get(`/chat/room`);
  const { data } = response;
  return data;
};

const createChatRoom = async ({ roomName }: CreateChatRoomParams): Promise<CreateChatRoomResponse> => {
  const response = await endpoint.post('/chat/room', { roomName });
  const { data } = response;
  return data;
};

const getRoomInvite = async (): Promise<GetRoomInviteResponse> => {
  const response = await endpoint.get(`/chat/invitation/got`);
  const { data } = response;
  return data;
};

const joinChatRoom = async ({ senderId, roomId }: JoinChatRoomParams): Promise<void> => {
  await endpoint.post('/chat/room/join', { senderId, roomId });
};

export { getChatRoomList, createChatRoom, getRoomInvite, joinChatRoom };
