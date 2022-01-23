import { takeLatest } from 'redux-saga/effects';
import { createSaga } from '../utils';
import { getChatRoomListAsync, createChatRoomAsync } from './actions';
import { ChatApi } from '../../apis';
import {
  GetChatRoomListParams,
  GetChatRoomListResponse,
  CreateChatRoomParams,
  CreateChatRoomResponse,
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
}
export default chatSaga;
