import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import Todo from './components/Todo';
import configureStore from './store';

let store = configureStore();

ReactDom.render(
  <Provider store={store}>
    <Todo data={[]} />
  </Provider>,
  document.getElementById('todo')
);
