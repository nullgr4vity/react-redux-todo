import _ from 'lodash';
import { FETCH_DATA_COMPLETE } from './../actions/fetch';
import { REMOVE_GROUPS_BEGIN,
  REMOVE_GROUPS_SELECT_TO_REMOVE,
  REMOVE_GROUPS_COMPLETE } from './../actions/groups';
import TodoGroupList from './../components/TodoGroupList';

let initialState = { items: {}, rgPhase: TodoGroupList.RG_PHASE_NONE, gidOnRemoveList: [] };

export default function groups(state = initialState, action) {
  switch (action.type) {
    case FETCH_DATA_COMPLETE: {
      let normalize = _.reduce(action.data, (memo, group) => {
        memo.items[group.id] = Object.assign({}, group);
        return memo;
      }, { items: {} });

      return Object.assign({}, state, normalize);
    }

    case REMOVE_GROUPS_BEGIN: {
      return Object.assign({},
        state, {
          rgPhase: TodoGroupList.RG_PHASE_BEGIN,
          gidOnRemoveList: []
        }
      );
    }

    case REMOVE_GROUPS_SELECT_TO_REMOVE: {
      return Object.assign({}, state, {
        gidOnRemoveList: [
          ...state.gidOnRemoveList,
          action.gid
        ]
      });
    }

    case REMOVE_GROUPS_COMPLETE: {
      if (!action.status) {
        return state;
      }

      let gids = action.gids.split(',').filter(Boolean) || [];
      let removed = _.reduce(state.items, (memo, group) => {
        if (gids.indexOf(group.id) >= 0) {
          return memo;
        }
        memo.items[group.id] = Object.assign({}, group);
        return memo;
      }, { items: {} });

      return Object.assign({}, state, { rgPhase: TodoGroupList.RG_PHASE_NONE }, removed);
    }

    default: {
      return state;
    }
  }
}
