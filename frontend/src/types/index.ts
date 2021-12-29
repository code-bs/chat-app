export type AllChatRoomResponse = {
  data: {
    rooms: ChatRoomInfo[];
  };
};

export type CreateChatRoomResponse = {
  data: {
    message: string;
    room: ChatRoomInfo;
  };
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
  nickName: string;
  avatarUrl: string;
  statusMessage: string;
};

export type SigninParams = {
  userId: string;
  password: string;
};

export type SignupParams = {
  userId: string;
  password: string;
};
