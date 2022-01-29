import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getChatRoomListAsync } from './store/chat/actions';
import { ChatProvider } from './contexts';
import { Signup, Signin, Main } from './pages';
import { Centered } from './layouts';
import RequireAuth from './router/RequireAuth';
import { useAppSelector, useAppDispatch } from './store/hooks';

function App() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const { signin } = auth;
  const userId = signin.data?.user?.userId;

  useEffect(() => {
    if (userId) dispatch(getChatRoomListAsync.request({ userId }));
  }, [dispatch, userId]);
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route element={<RequireAuth />}>
        <Route
          path="/chat/*"
          element={
            <ChatProvider>
              <Main />
            </ChatProvider>
          }
        />
      </Route>
      <Route
        path="/signup"
        element={
          <Centered>
            <Signup />
          </Centered>
        }
      />
      <Route
        path="/signin"
        element={
          <Centered>
            <Signin />
          </Centered>
        }
      />
    </Routes>
  );
}

export default App;
