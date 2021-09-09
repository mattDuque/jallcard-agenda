import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './StateProvider';
import reducer, { initialState } from './reducer';
import './Styles/index.css';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);


