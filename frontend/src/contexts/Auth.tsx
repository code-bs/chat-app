import React, { useReducer, useContext, createContext, Dispatch, ReactNode } from 'react';

type State = {
  userId: string;
};

export enum AuthActionTypes {
  SIGN_IN,
}

type Action = { type: AuthActionTypes.SIGN_IN; userId: string };

type AuthDispatch = Dispatch<Action>;

const initialState: State = {
  userId: '',
};

const AuthStateContext = createContext<State>(initialState);
const AuthDispatchContext = createContext<AuthDispatch>(() => null);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      return {
        ...state,
        userId: action.userId,
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

export const signIn = (dispatch: AuthDispatch, userId: string) => {
  dispatch({ type: AuthActionTypes.SIGN_IN, userId });
};
