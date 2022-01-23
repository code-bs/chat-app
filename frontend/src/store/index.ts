import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { all } from 'redux-saga/effects';

import authReducer from './auth/reducer';
import chatReducer from './chat/reducer';

import authSaga from './auth/sagas';
import chatSaga from './chat/sagas';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([authSaga(), chatSaga()]);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
