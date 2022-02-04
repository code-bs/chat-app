import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

import { AuthProvider } from './contexts';
import { history } from './router/history';

import reportWebVitals from './reportWebVitals';
import './styles/base.scss';
import './styles/antd.scss';
import 'antd/dist/antd.css';

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
