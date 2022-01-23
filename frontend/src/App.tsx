import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChatProvider } from './contexts';
import { Signup, Signin, Main } from './pages';
import { Centered } from './layouts';
import { useAppSelector } from './store/hooks';

function App() {
  const location = useLocation();
  const auth = useAppSelector(state => state.auth);
  const { signin } = auth;
  const { data } = signin;
  const navigate = useNavigate();
  const { pathname } = location;
  useEffect(() => {
    if (!data && pathname !== '/signin' && pathname !== '/signup') navigate('/signin');
  }, [pathname, navigate, data]);
  return (
    <Routes>
      <Route
        index
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
