import React, { useReducer, useContext, createContext, Dispatch, ReactNode } from 'react';
import { ChatRoomInfo } from '../types';
import * as API from '../apis';

type State = {
  rooms: ChatRoomInfo[];
};

export enum ChatActionTypes {
  GET_ROOM_LIST,
}

type Action = { type: ChatActionTypes.GET_ROOM_LIST; rooms: ChatRoomInfo[] };

type ChatDispatch = Dispatch<Action>;

const initialState: State = {
  rooms: [],
};

const ChatStateContext = createContext<State>(initialState);
const ChatDispatchContext = createContext<ChatDispatch>(() => null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ChatActionTypes.GET_ROOM_LIST:
      return {
        ...state,
        rooms: action.rooms,
      };
  }
};

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

export const getAllRoom = async (dispatch: ChatDispatch) => {
  try {
    const { rooms } = await API.getChatRoomList();
    dispatch({ type: ChatActionTypes.GET_ROOM_LIST, rooms });
  } catch (e: any) {
    console.log(e.message);
  }
};
