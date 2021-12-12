import React from 'react';
import App from './app';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

render(
  <HashRouter>
  <App />
  </HashRouter>,
  document.querySelector('#root')
);
