import { fork, takeLatest } from 'redux-saga/effects';
import { createSaga, createSocketSaga } from '../utils';
import {
  getChatRoomListAsync,
  createChatRoomAsync,
  recieveMessage,
  getRoomInviteAsync,
  joinChatRoomAsync,
  denyRoomInviteAsync,
} from './actions';
import { ChatApi } from '../../apis';
import {
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  GetRoomInviteResponse,
  Message,
  JoinChatRoomParams,
  DenyRoomInviteParams,
} from '../../types';
function* chatSaga() {
  yield takeLatest(
    getChatRoomListAsync.REQUEST,
    createSaga<void, GetChatRoomListResponse>(getChatRoomListAsync, ChatApi.getChatRoomList),
  );
  yield takeLatest(
    createChatRoomAsync.REQUEST,
    createSaga<CreateChatRoomParams, CreateChatRoomResponse>(createChatRoomAsync, ChatApi.createChatRoom),
  );
  yield takeLatest(
    getRoomInviteAsync.REQUEST,
    createSaga<void, GetRoomInviteResponse>(getRoomInviteAsync, ChatApi.getRoomInvite),
  );
  yield takeLatest(
    joinChatRoomAsync.REQUEST,
    createSaga<JoinChatRoomParams, void>(joinChatRoomAsync, ChatApi.joinChatRoom),
  );
  yield takeLatest(
    denyRoomInviteAsync.REQUEST,
    createSaga<DenyRoomInviteParams, void>(denyRoomInviteAsync, ChatApi.denyRoomInvite),
  );
  yield fork(createSocketSaga<Message>(recieveMessage, 'newMessage'));
}
export default chatSaga;
