import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { getChatRoomListAsync } from './store/chat/actions';
import { ChatProvider } from './contexts';
import { Signup, Signin, Main } from './pages';
import { Centered } from './layouts';
import { useAppSelector, useAppDispatch } from './store/hooks';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const { signin } = auth;
  const { data } = signin;
  const userId = signin.data?.user?.userId;
  const navigate = useNavigate();
  const { pathname } = location;
  useEffect(() => {
    if (!data && pathname !== '/signin' && pathname !== '/signup') navigate('/signin');
  }, [pathname, navigate, data]);
  useEffect(() => {
    if (userId) dispatch(getChatRoomListAsync.request({ userId }));
  }, [dispatch, userId]);
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <ChatProvider>
            <Main />
          </ChatProvider>
        }
      />
      <Route
        path="signup"
        element={
          <Centered>
            <Signup />
          </Centered>
        }
      />
      <Route
        path="signin"
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
