import { PayloadAction, ActionCreatorWithPayload, createAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

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

export const createSaga = <Params, Payload>(actions: IFetchActionGroup, req: any, onSuccess: () => void) => {
  return function* (action: PayloadAction<Params>) {
    const payload = action.payload;
    try {
      const res: Payload = yield call(req, payload);
      yield put(actions.success(res));
      onSuccess();
    } catch (e) {
      if (axios.isAxiosError(e)) {
        yield put(actions.failure(e.response?.data));
      }
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
) => {
  builder
    .addCase(actions.request, (state, action) => {
      state[entity].data = action.payload;
      state[entity].error = null;
      state[entity].status = ASYNC_STATUS.LOADING;
    })
    .addCase(actions.success, (state, action) => {
      state[entity].data = action.payload;
      state[entity].error = null;
      state[entity].status = ASYNC_STATUS.SUCCESS;
    })
    .addCase(actions.failure, (state, action) => {
      state[entity].error = action.payload;
      state[entity].status = ASYNC_STATUS.FAILURE;
    });
};
