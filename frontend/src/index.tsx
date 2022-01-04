import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChatProvider, AuthProvider } from './contexts';

import reportWebVitals from './reportWebVitals';
import './styles/base.scss';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
