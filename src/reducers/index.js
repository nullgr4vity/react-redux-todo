import { combineReducers } from 'redux';
import fetch from './fetch';
import groups from './groups';
import todos from './todos';
import nav from './nav';

export default combineReducers({
  fetch, groups, todos, nav
});
