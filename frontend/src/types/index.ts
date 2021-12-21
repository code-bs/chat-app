type AllChatRoomResponse = {
  data: {
    rooms: ChatRoomInfo[];
  };
};

type CreateChatRoomResponse = {
  data: {
    message: string;
    room: ChatRoomInfo;
  };
};

type CreateChatRoomParams = {
  roomName: string;
  userId: string;
};

type ChatRoomInfo = {
  _id: string;
  roomId: string;
  roomName: string;
  regDate: string;
  masterUserId: string;
  chatHistory: ChatLog[];
};

type ChatLog = {
  message: string;
  regDate: string;
  userId: string;
};

export type { ChatRoomInfo, ChatLog, AllChatRoomResponse, CreateChatRoomResponse, CreateChatRoomParams };
