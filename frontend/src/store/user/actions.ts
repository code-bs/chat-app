import { createFetchAction } from '../utils';
import {
  GetFriendListResponse,
  SearchUserParams,
  SearchUserResponse,
  GetFriendRequestResponse,
  AcceptFriendRequestParams,
  DenyFriendRequestParams,
} from '../../types';

export const getFriendListAsync = createFetchAction<void, GetFriendListResponse>('getFriendList');
export const searchUserAsync = createFetchAction<SearchUserParams, SearchUserResponse>('searchUser');
export const getFriendRequestAsync = createFetchAction<void, GetFriendRequestResponse>('getFriendRequest');
export const acceptFriendRequestAsync = createFetchAction<AcceptFriendRequestParams, void>('acceptFriendRequest');
export const denyFriendRequestAsync = createFetchAction<DenyFriendRequestParams, void>('denyFriendRequest');
