import { takeLatest } from 'redux-saga/effects';
import { createSaga } from '../utils';
import { getChatRoomListAsync } from './actions';
import { ChatApi } from '../../apis';
import { GetChatRoomListParams, GetChatRoomListResponse } from '../../types';
function* chatSaga() {
  yield takeLatest(
    getChatRoomListAsync.REQUEST,
    createSaga<GetChatRoomListParams, GetChatRoomListResponse>(getChatRoomListAsync, ChatApi.getChatRoomList),
  );
}
export default chatSaga;
