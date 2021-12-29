import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup, Signin, Main } from './pages';
import { Centered } from './layouts';

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
