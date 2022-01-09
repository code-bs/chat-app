import React, { useReducer, useContext, createContext, Dispatch, ReactNode } from 'react';
import { UserApi } from '../apis';
import { SigninParams, SignupParams, SigninResponse } from '../types';
import { history } from '../router/history';
import axios from 'axios';

type State = {
  auth: {
    data?: SigninResponse;
    error: string;
    loading: boolean;
  };
};

export enum AuthActionTypes {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
}

type Action =
  | { type: AuthActionTypes.SIGNIN_REQUEST }
  | { type: AuthActionTypes.SIGNIN_SUCCESS; payload: SigninResponse }
  | { type: AuthActionTypes.SIGNIN_FAILURE; error: string };
type AuthDispatch = Dispatch<Action>;

const initialState: State = {
  auth: {
    loading: false,
    error: '',
  },
};

const AuthStateContext = createContext<State>(initialState);
const AuthDispatchContext = createContext<AuthDispatch>(() => null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case AuthActionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        auth: { ...state.auth, loading: true, error: '' },
      };
    case AuthActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        auth: { ...state.auth, data: action.payload, loading: false, error: '' },
      };
    case AuthActionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        auth: { ...state.auth, error: action.error, loading: false },
      };
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const state = useContext(AuthStateContext);
  return state;
};

export const useAuthDispatch = () => {
  const dispatch = useContext(AuthDispatchContext);
  return dispatch;
};

export const signin = async (dispatch: AuthDispatch, { userId, password }: SigninParams) => {
  dispatch({ type: AuthActionTypes.SIGNIN_REQUEST });
  try {
    const payload = await UserApi.signin({ userId, password });
    dispatch({ type: AuthActionTypes.SIGNIN_SUCCESS, payload });
    history.push('/');
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.log(e.response);
      if (e.response.status < 500) dispatch({ type: AuthActionTypes.SIGNIN_FAILURE, error: e.response.data });
    }
  }
};

export const signup = async (dispatch: AuthDispatch, { userId, password, nickname }: SignupParams) => {
  await UserApi.signup({ userId, password, nickname });
};
