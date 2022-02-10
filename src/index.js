import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssBaseline>
        <App />
      </CssBaseline>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
