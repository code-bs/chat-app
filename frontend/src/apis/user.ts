import endpoint from './endpoint';
import {
  FindUserParams,
  AddFriendParams,
  FindUserResponse,
  GetFriendRequestResponse,
  GetFriendListResponse,
  ChangeProfileParams,
} from '../types';

const findUser = async ({ userId }: FindUserParams): Promise<FindUserResponse> => {
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

const addFriend = async ({ senderId }: AddFriendParams): Promise<void> => {
  await endpoint.post('/user/friend', { senderId });
};

export { findUser, getFriendList, getFriendRequest, addFriend, changeProfile };
