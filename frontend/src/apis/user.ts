import endpoint from './endpoint';
import {
  FindUserParams,
  GetFriendListParams,
  CheckRequestParams,
  AddFriendParams,
  FindUserResponse,
  GetChatRoomListResponse,
  CheckRequestResponse,
  GetFriendListResponse,
} from '../types';

const findUser = async ({ userId }: FindUserParams): Promise<FindUserResponse> => {
  const { data } = await endpoint.get(`/user/${userId}`);
  console.log(data);
  return data;
};

const getFriendList = async ({ userId }: GetFriendListParams): Promise<GetFriendListResponse> => {
  const { data } = await endpoint.get(`/user/friend/${userId}`);
  console.log(data);
  return data;
};

const checkRequest = async ({ userId }: CheckRequestParams): Promise<CheckRequestResponse> => {
  const { data } = await endpoint.get(`/user/friend_req/${userId}`);
  console.log(data);
  return data;
};

const addFriend = async ({ userId, friendId }: AddFriendParams): Promise<void> => {
  await endpoint.post('/auth', { userId, friendId });
};

export { findUser, getFriendList, checkRequest, addFriend };
