import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);