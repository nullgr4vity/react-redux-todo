export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_DATA_COMPLETE = 'FETCH_DATA_COMPLETE';

export function requestTodos() {
  return {
    type: FETCH_DATA,
    loading: true
  };
}

function receiveTodos(result) {
  return {
    type: FETCH_DATA_COMPLETE,
    data: result.data,
    status: result.status,
    loading: false
  };
}

function fetchTodos() {
  return dispatch => {
    dispatch(requestTodos());
    return fetch('/api/data')
      .then(result => result.json())
      .then(result => dispatch(receiveTodos(result)));
  };
}

export function fetchTodosIfNeeded() {
  return (dispatch) =>
    dispatch(fetchTodos());
}
