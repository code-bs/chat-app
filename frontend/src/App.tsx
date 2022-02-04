import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChatProvider } from './contexts';
import { Signup, Signin, Chat } from './pages';
import { Centered } from './layouts';
import RequireAuth from './router/RequireAuth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
      <Route element={<RequireAuth />}>
        <Route
          path="/chat/*"
          element={
            <ChatProvider>
              <Chat />
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
