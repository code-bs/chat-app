import endpoint from './endpoint';
import {
  SearchUserParams,
  AcceptFriendRequestParams,
  SearchUserResponse,
  GetFriendRequestResponse,
  GetFriendListResponse,
  ChangeProfileParams,
  DenyFriendRequestParams,
} from '../types';

const searchUser = async ({ userId }: SearchUserParams): Promise<SearchUserResponse> => {
  const { data } = await endpoint.get(`/user`, { params: { userId } });
  console.log(data);
  return data;
};

const changeProfile = async (userInfo: ChangeProfileParams): Promise<void> => {
  await endpoint.put('/user', userInfo);
};

const getFriendList = async (): Promise<GetFriendListResponse> => {
  const { data } = await endpoint.get(`/user/friend`);
  console.log(data);
  return data;
};

const getFriendRequest = async (): Promise<GetFriendRequestResponse> => {
  const { data } = await endpoint.get(`/user/request/got`);
  console.log(data);
  return data;
};

const acceptFriendRequest = async ({ senderId }: AcceptFriendRequestParams): Promise<void> => {
  await endpoint.post('/user/friend', { senderId });
};

const denyFriendRequest = async ({ senderId }: DenyFriendRequestParams): Promise<void> => {
  await endpoint.put('/user/request', { senderId });
};

export { searchUser, getFriendList, getFriendRequest, acceptFriendRequest, changeProfile, denyFriendRequest };
