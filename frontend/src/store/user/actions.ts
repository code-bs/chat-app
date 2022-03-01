import { createFetchAction } from '../utils';
import {
  GetFriendListResponse,
  FindUserParams,
  FindUserResponse,
  GetFriendRequestResponse,
  AcceptFriendRequestParams,
} from '../../types';

export const getFriendListAsync = createFetchAction<void, GetFriendListResponse>('getFriendList');
export const findUserAsync = createFetchAction<FindUserParams, FindUserResponse>('findUser');
export const getFriendRequestAsync = createFetchAction<void, GetFriendRequestResponse>('getFriendRequest');
export const acceptFriendRequestAsync = createFetchAction<AcceptFriendRequestParams, void>('acceptFriendRequest');
