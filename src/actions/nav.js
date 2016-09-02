export const NAV_TO_DETAILS = 'NAV_TO_DETAILS';
export const NAV_TO_GROUPS = 'NAV_TO_GROUPS';

export const NAV_FILTER_ALL = 'all';
export const NAV_FILTER_GID = 'gid';
export const NAV_FILTER_COMPLETED = 'completed';
export const NAV_FILTER_INCOMPLETE = 'incomplete';

export function navigateToDetails(options) {
  return (dispatch) =>
    dispatch({ type: NAV_TO_DETAILS,
      activeGid: options.gid,
      visibilityFilter: options.visibilityFilter });
}

export function navigateToGroups() {
  return (dispatch) =>
    dispatch({ type: NAV_TO_GROUPS });
}
