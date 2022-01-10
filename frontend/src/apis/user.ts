import endpoint from './endpoint';
import { FindUserParams, GetFriendListParams, CheckRequestParams, AddFriendParams } from '../types';

const findUser = async ({ userId }: FindUserParams) => {
  const { data } = await endpoint.get(`/user/${userId}`);
  console.log(data);
  return data;
};

const getFriendList = async ({ userId }: GetFriendListParams) => {
  const { data } = await endpoint.get(`/user/friend/${userId}`);
  console.log(data);
  return data;
};

const checkRequest = async ({ userId }: CheckRequestParams) => {
  const { data } = await endpoint.get(`/user/friend_req/${userId}`);
  console.log(data);
  return data;
};

const addFriend = async ({ userId, friendId }: AddFriendParams) => {
  await endpoint.post('/auth', { userId, friendId });
};

export { findUser, getFriendList, checkRequest, addFriend };
