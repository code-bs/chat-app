import React, { useReducer, useContext, useEffect, createContext, Dispatch, ReactNode } from 'react';
import { io } from 'socket.io-client';
import { ChatRoomInfo, CreateChatRoomParams } from '../types';
import * as API from '../apis';

type State = {
  rooms: ChatRoomInfo[];
  selectedRoomId: string;
};

export enum ChatActionTypes {
  GET_ROOM_LIST,
  CREATE_ROOM,
  SELECT_ROOM,
}

type Action =
  | { type: ChatActionTypes.GET_ROOM_LIST; rooms: ChatRoomInfo[] }
  | { type: ChatActionTypes.CREATE_ROOM; room: ChatRoomInfo }
  | { type: ChatActionTypes.SELECT_ROOM; id: string };

type ChatDispatch = Dispatch<Action>;

const initialState: State = {
  rooms: [],
  selectedRoomId: '',
};

const ChatStateContext = createContext<State>(initialState);
const ChatDispatchContext = createContext<ChatDispatch>(() => null);
const socket = io(`ws://${process.env.REACT_APP_SOCKET_END_POINT}`);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ChatActionTypes.GET_ROOM_LIST:
      return {
        ...state,
        rooms: action.rooms,
      };
    case ChatActionTypes.CREATE_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.room],
      };
    case ChatActionTypes.SELECT_ROOM:
      return {
        ...state,
        selectedRoomId: action.id,
      };
  }
};

const initSocketEvent = () => {
  socket.on('connect', () => {
    console.log('connect');
  });
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
};

const addMessageEvent = (dispatch: ChatDispatch, roomId: string) => {
  socket.on(roomId, (message: any) => {
    console.log(message);
  });
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const init = async () => {
      try {
        const { rooms } = await API.getChatRoomList();
        dispatch({ type: ChatActionTypes.GET_ROOM_LIST, rooms });
        initSocketEvent();
        rooms.forEach(room => {
          addMessageEvent(dispatch, room._id);
        });
      } catch (e: any) {
        console.log(e.message);
      }
    };
    init();
  }, []);
  return (
    <ChatStateContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>{children}</ChatDispatchContext.Provider>
    </ChatStateContext.Provider>
  );
};

export const useChatState = () => {
  const state = useContext(ChatStateContext);
  return state;
};

export const useChatDispatch = () => {
  const dispatch = useContext(ChatDispatchContext);
  return dispatch;
};

export const createChatRoom = async (dispatch: ChatDispatch, { roomName, userId }: CreateChatRoomParams) => {
  try {
    const { room } = await API.createChatRoom({ roomName, userId });
    dispatch({ type: ChatActionTypes.CREATE_ROOM, room });
  } catch (e: any) {
    console.log(e.message);
  }
};

export const selectRoom = (dispatch: ChatDispatch, id: string) => {
  dispatch({ type: ChatActionTypes.SELECT_ROOM, id });
  socket.emit('enterRoom', {
    roomId: id,
  });
};

export const sendMessage = (dispatch: ChatDispatch, id: string, message: string) => {
  socket.emit(id, message);
};
