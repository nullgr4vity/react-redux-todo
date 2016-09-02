import _ from 'lodash';
import { FETCH_DATA_COMPLETE } from './../actions/fetch';
import { TOOGLE_ITEM_COMPLETE } from './../actions/todos';
import { REMOVE_GROUPS_COMPLETE } from './../actions/groups';

export default function todos(state = {}, action) {
  switch (action.type) {

    case FETCH_DATA_COMPLETE: {
      let normalized = _.reduce(action.data, (memo, group) => {
        for (let i = 0; i < group.data.length; i++) {
          let item = group.data[i];
          memo.items[item.id] = Object.assign({}, item, { gid: group.id });
        }
        return memo;
      }, { items: {} });

      return Object.assign({}, state, normalized);
    }

    case TOOGLE_ITEM_COMPLETE: {
      let toggled = _.reduce(state.items, (memo, todo) => {
        if (todo.id === action.id) {
          memo.items[todo.id] = Object.assign({}, todo, { completed: action.completed });
        } else {
          memo.items[todo.id] = todo;
        }
        return memo;
      }, { items: {} });

      return Object.assign({}, state, toggled);
    }

    case REMOVE_GROUPS_COMPLETE: {
      if (!action.removed || !action.status) {
        return state;
      }

      let gids = action.gids.split(',').filter(Boolean) || [];
      let data = _.reduce(state.items, (memo, todo) => {
        if (gids.indexOf(todo.gid) >= 0) {
          return memo;
        }
        memo.items[todo.id] = Object.assign({}, todo);
        return memo;
      }, { items: {} });

      return Object.assign({}, state, data);
    }

    default: {
      return state;
    }
  }
}
