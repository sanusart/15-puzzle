import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import { Provider } from 'react-redux';
import Routes from './routes';
import Store from './store';

const rootNode = document.getElementById('root');

import './Puzzle.css';

const StoreInstance = Store();

if (process.env.NODE_ENV !== 'production') {
  window.store = StoreInstance;
}

ReactDOM.render(
  <Provider store={StoreInstance}>
    <Routes history={browserHistory} />
  </Provider>,
  rootNode
);
