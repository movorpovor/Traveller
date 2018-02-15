import React from 'react';
import {render} from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './src/App';
import './src/app.css'
import configureStore from './src/store/configureStore'

const initState = {
  selectedPoint: {},
  map: {},
  points: [],
  logged_in: false
}

const store = configureStore(initState);

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )