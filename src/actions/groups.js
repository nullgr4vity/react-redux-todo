export const REMOVE_GROUPS = 'REMOVE_GROUPS';
export const REMOVE_GROUPS_BEGIN = 'REMOVE_GROUPS_BEGIN';
export const REMOVE_GROUPS_COMPLETE = 'REMOVE_GROUPS_COMPLETE';
export const REMOVE_GROUPS_SELECT_TO_REMOVE = 'REMOVE_GROUPS_SELECT_TO_REMOVE';

function removeGroupsInitiate(gids) {
  return { type: REMOVE_GROUPS, gids };
}

function removeGroupsCompleted() {
  return {
    type: REMOVE_GROUPS_COMPLETE,
    status: true,
    removed: true,
    gids: '',
    loading: false
  };
}

function removeGroupsCompleteReceive(result) {
  return {
    type: REMOVE_GROUPS_COMPLETE,
    status: result.status,
    removed: result.removed,
    gids: result.gids,
    loading: false
  };
}

export function selectGroupToRemove(gid) {
  return { type: REMOVE_GROUPS_SELECT_TO_REMOVE, gid };
}

export function removeGroupsBegin() {
  return { type: REMOVE_GROUPS_BEGIN };
}

export function removeGroupsComplete() {
  return (dispatch, getState) => {
    let gids = getState().groups.gidOnRemoveList.join(',');
    if (gids !== '') {
      dispatch(removeGroupsInitiate(gids));
      return fetch(`/api/data/${gids}`, {
        method: 'DELETE'
      })
      .then(result => result.json())
      .then(result => dispatch(removeGroupsCompleteReceive(result)));
    }

    return dispatch(removeGroupsCompleted());
  };
}
