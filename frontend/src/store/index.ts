import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import authReducer from './auth/reducer';
import authSaga from './auth/sagas';
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([authSaga()]);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
