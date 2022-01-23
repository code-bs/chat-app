export type AllChatRoomResponse = {
  data: ChatRoomInfo[];
};

export type CreateChatRoomResponse = {
  data: ChatRoomInfo;
};

export type CreateChatRoomParams = {
  roomName: string;
  userId: string;
};

export type ChatRoomInfo = {
  _id: string;
  roomId: string;
  roomName: string;
  regDate: string;
  masterUserId: string;
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

export type SignupParams = {
  userId: string;
  password: string;
  nickname: string;
};

export type SignupResponse = {
  userId: string;
};

export type GetChatRoomListParams = {
  userId: string;
};

export type FindUserParams = {
  userId: string;
};

export type GetFriendListParams = {
  userId: string;
};

export type CheckRequestParams = {
  userId: string;
};

export type AddFriendParams = {
  userId: string;
  friendId: string;
};
