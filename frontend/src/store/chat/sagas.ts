import { fork, takeLatest } from 'redux-saga/effects';
import { createSaga, createSocketSaga } from '../utils';
import {
  getChatRoomListAsync,
  createChatRoomAsync,
  recieveMessage,
  getRoomInviteAsync,
  joinChatRoomAsync,
} from './actions';
import { ChatApi } from '../../apis';
import {
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  GetRoomInviteResponse,
  Message,
  JoinChatRoomParams,
} from '../../types';
function* chatSaga() {
  yield takeLatest(
    getChatRoomListAsync.REQUEST,
    createSaga<any, GetChatRoomListResponse>(getChatRoomListAsync, ChatApi.getChatRoomList),
  );
  yield takeLatest(
    createChatRoomAsync.REQUEST,
    createSaga<CreateChatRoomParams, CreateChatRoomResponse>(createChatRoomAsync, ChatApi.createChatRoom),
  );
  yield takeLatest(
    getRoomInviteAsync.REQUEST,
    createSaga<any, GetRoomInviteResponse>(getRoomInviteAsync, ChatApi.getRoomInvite),
  );
  yield takeLatest(
    joinChatRoomAsync.REQUEST,
    createSaga<JoinChatRoomParams, any>(joinChatRoomAsync, ChatApi.joinChatRoom),
  );
  yield fork(createSocketSaga<Message>(recieveMessage, 'receiveMessage'));
}
export default chatSaga;
