import { createFetchAction } from '../utils';
import {
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestResponse,
  AddFriendParams,
} from '../../types';

export const getFriendListAsync = createFetchAction<void, GetFriendListResponse>('getFriendList');
export const findUserAsync = createFetchAction<FindUserParams, FindUserResponse>('findUser');
export const getFriendRequestAsync = createFetchAction<void, GetFriendRequestResponse>('getFriendRequest');
export const addFriendAsync = createFetchAction<AddFriendParams, void>('addFriend');
