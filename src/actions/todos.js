export const TOGGLE_ITEM = 'TOGGLE_ITEM';
export const TOOGLE_ITEM_COMPLETE = 'TOOGLE_ITEM_COMPLETE';

function toggleItemInitiate(gid, id) {
  return { type: TOGGLE_ITEM, gid, id, loading: true };
}

function toggleItemCompleteReceive(result) {
  return {
    type: TOOGLE_ITEM_COMPLETE,
    status: result.status,
    completed: result.completed,
    gid: result.gid,
    id: result.tid,
    loading: false
  };
}

export function toggleItem(gid, id) {
  return dispatch => {
    dispatch(toggleItemInitiate(gid, id));
    return fetch(`/api/data/${gid}/todo/${id}`, {
      method: 'PUT'
    })
    .then(result => result.json())
    .then(result => dispatch(toggleItemCompleteReceive(result)));
  };
}
