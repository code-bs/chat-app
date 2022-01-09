import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ChatProvider } from './contexts';
import { Signup, Signin, Main } from './pages';
import { Centered } from './layouts';
import { useAuthState } from './contexts';

function App() {
  const location = useLocation();
  const { auth } = useAuthState();
  const navigate = useNavigate();
  const { pathname } = location;
  useEffect(() => {
    if (!auth.data && pathname !== '/signin' && pathname !== '/signup') navigate('/signin');
  }, [pathname, navigate, auth]);
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
