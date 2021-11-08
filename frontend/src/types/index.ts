type ChatRoomInfo = {
  roomId: string;
  roomName: string;
  regDate: string;
  masterUserId: string;
  chatHistory: ChatLog[];
};

type ChatLog = {
  message: string;
  regDate: string;
  userId: String;
};

export type { ChatRoomInfo, ChatLog };
