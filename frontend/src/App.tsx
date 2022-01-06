import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Signup, Signin, Main } from './pages';
import { Centered } from './layouts';
import { useAuthState } from './contexts';

function App() {
  const location = useLocation();
  const { userId } = useAuthState();
  const navigate = useNavigate();
  const { pathname } = location;
  useEffect(() => {
    if (!userId && pathname !== '/signin') navigate('/signin');
  }, [pathname, navigate, userId]);
  return (
    <Routes>
      <Route index element={<Main />} />
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
