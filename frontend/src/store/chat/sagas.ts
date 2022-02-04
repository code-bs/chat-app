import { fork, takeLatest } from 'redux-saga/effects';
import { createSaga, createSocketSaga } from '../utils';
import { getChatRoomListAsync, createChatRoomAsync, recieveMessage } from './actions';
import { ChatApi } from '../../apis';
import {
  GetChatRoomListParams,
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
  Message,
} from '../../types';
function* chatSaga() {
  yield takeLatest(
    getChatRoomListAsync.REQUEST,
    createSaga<GetChatRoomListParams, GetChatRoomListResponse>(getChatRoomListAsync, ChatApi.getChatRoomList),
  );
  yield takeLatest(
    createChatRoomAsync.REQUEST,
    createSaga<CreateChatRoomParams, CreateChatRoomResponse>(createChatRoomAsync, ChatApi.createChatRoom),
  );
  yield fork(createSocketSaga<Message>(recieveMessage, 'receiveMessage'));
}
export default chatSaga;
