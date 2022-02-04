import { createFetchAction } from '../utils';

export const getFriendListAsync = createFetchAction('getFriendList');
export const findUserAsync = createFetchAction('findUser');
export const getFriendRequestAsync = createFetchAction('getFriendRequest');
