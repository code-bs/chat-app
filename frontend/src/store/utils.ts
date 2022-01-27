import {
  PayloadAction,
  ActionCreatorWithPayload,
  createAction,
  ActionReducerMapBuilder,
  Draft,
} from '@reduxjs/toolkit';
import { eventChannel, EventChannel } from 'redux-saga';
import { call, put, take } from 'redux-saga/effects';
import axios from 'axios';
import socket from './socket';

export enum ASYNC_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  FAILURE,
}

export type AsyncEntity<T> = {
  data: T | null;
  status: ASYNC_STATUS;
  error: string | null;
};

export type IFetchActionGroup = {
  TYPE: string;
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
  request: ActionCreatorWithPayload<any>;
  success: ActionCreatorWithPayload<any>;
  failure: ActionCreatorWithPayload<string>;
};

type OnFinishCallback = {
  onSuccess?: () => void;
  onFailure?: () => void;
};

export const createFetchAction = <Params, Payload>(type: string): IFetchActionGroup => {
  const REQUEST = `${type}/REQUEST`;
  const SUCCESS = `${type}/SUCCESS`;
  const FAILURE = `${type}/FAILURE`;

  return {
    TYPE: type,
    REQUEST,
    SUCCESS,
    FAILURE,
    request: createAction<Params | undefined>(REQUEST),
    success: createAction<Payload>(SUCCESS),
    failure: createAction<string>(FAILURE),
  };
};

export const createSaga = <Params, Payload>(actions: IFetchActionGroup, req: any, onFinish?: OnFinishCallback) => {
  return function* (action: PayloadAction<Params>) {
    const payload = action.payload;
    try {
      const res: Payload = yield call(req, payload);
      yield put(actions.success(res));
      if (onFinish && onFinish.onSuccess) onFinish.onSuccess();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        yield put(actions.failure(e.response?.data));
      }
      if (onFinish && onFinish.onFailure) onFinish.onFailure();
    }
  };
};

export const createInitialState = <T>(): AsyncEntity<T> => ({
  data: null,
  status: ASYNC_STATUS.IDLE,
  error: null,
});

export const createPatialReducer = <State extends { [key: string]: AsyncEntity<any> }>(
  builder: ActionReducerMapBuilder<State>,
  entity: string,
  actions: IFetchActionGroup,
  onSuccess?: (
    state: Draft<State>,
    action: {
      payload: any;
      type: string;
    },
  ) => void,
) => {
  builder
    .addCase(actions.request, state => {
      state[entity].error = null;
      state[entity].status = ASYNC_STATUS.LOADING;
    })
    .addCase(actions.success, (state, action) => {
      if (onSuccess) {
        onSuccess(state, action);
      } else {
        state[entity].data = action.payload;
        state[entity].error = null;
        state[entity].status = ASYNC_STATUS.SUCCESS;
      }
    })
    .addCase(actions.failure, (state, action) => {
      state[entity].error = action.payload;
      state[entity].status = ASYNC_STATUS.FAILURE;
    });
};

export const createSocketChannel = <T>(eventType: string) => {
  return eventChannel<T>(emit => {
    const emitter = (message: T) => emit(message);

    socket.on(eventType, emitter);
    return function unsubscribe() {
      socket.off(eventType, emitter);
    };
  });
};

export const closeChannel = (channel: EventChannel<any>) => {
  if (channel) {
    channel.close();
  }
};

export const createSocketSaga = <T>(action: ActionCreatorWithPayload<T>, eventType: string) => {
  return function* () {
    const channel: EventChannel<T> = yield call(createSocketChannel, eventType);
    while (true) {
      try {
        const message: T = yield take(channel);
        yield put(action(message));
      } catch (e: any) {
        console.log(e.message);
      }
    }
  };
};
