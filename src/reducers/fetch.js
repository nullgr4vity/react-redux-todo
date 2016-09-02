import { FETCH_DATA, FETCH_DATA_COMPLETE } from './../actions/fetch';

export default function fetch(state = {}, action) {
  switch (action.type) {
    case FETCH_DATA: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case FETCH_DATA_COMPLETE: {
      return Object.assign({}, state, {
        loading: false
      });
    }

    default: {
      return state;
    }
  }
}
