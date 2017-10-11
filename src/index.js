import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { createLogger } from 'redux-logger';

import Crowdsale from './components/Crowdsale';
import reducer from './reducers';

const middleware = [];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <Crowdsale />
  </Provider>,
  // eslint-disable-next-line
  document.getElementById('root')
);
