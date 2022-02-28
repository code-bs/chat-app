export type GetChatRoomListResponse = ChatRoomInfo[];
export type CreateChatRoomResponse = ChatRoomInfo;

export type CreateChatRoomParams = {
  roomName: string;
};

export type ChatRoomInfo = {
  _id: string;
  roomId: string;
  roomName: string;
  regDate: string;
  users: User[];
  chatHistory: ChatLog[];
};

export type ChatLog = {
  message: string;
  regDate: string;
  userId: string;
};

export type User = {
  userId: string;
  nickname: string;
  avatarUrl: string;
  statusMessage: string;
};

export type SigninParams = {
  userId: string;
  password: string;
};

export type SigninResponse = {
  user: User;
  accessToken: string;
};

export type SignupParams = User & {
  password: string;
};

export type SignupResponse = {
  userId: string;
};

export type FindUserParams = {
  userId: string;
};

export type GetRoomInviteResponse = {
  room: ChatRoomInfo;
  sender: User;
  curStatus: string;
}[];

export type FindUserResponse = User[];

export type GetFriendListResponse = User[];

export type GetFriendRequestResponse = User[];

export type AddFriendParams = {
  senderId: string;
};

export type Message = {
  roomId: string;
  message: string;
  userId: string;
  nickname: string;
  avatarUrl: string;
  statusMessage: string;
};

export type GetRefreshTokenResponse = {
  user: User;
  accessToken: string;
};

export type SendFriendRequestParams = {
  sender: User;
  targetId: string;
};

export type InviteChatRoomParams = {
  sender: User;
  targetId: string;
  roomId: string;
};

export type JoinChatRoomParams = {
  senderId: string;
  roomId: string;
};

export type ChangeProfileParams = {
  nickname: string;
  avatarUrl: string;
  statusMessage: string;
};
