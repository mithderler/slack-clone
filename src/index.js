import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import store from './store/index';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline>
        <Provider store={store}>
          <App />
        </Provider>
      </CssBaseline>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
