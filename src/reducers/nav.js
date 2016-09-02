import { NAV_FILTER_ALL, NAV_TO_DETAILS, NAV_TO_GROUPS } from './../actions/nav';
import { CAROUSEL_PAGE_GROUPS, CAROUSEL_PAGE_DETAILS } from './../components/Carousel';

export default function nav(state = {}, action) {
  switch (action.type) {
    case NAV_TO_DETAILS: {
      return Object.assign({}, state, {
        activeGid: action.activeGid,
        visibilityFilter: action.visibilityFilter,
        activePageIndex: CAROUSEL_PAGE_DETAILS
      });
    }

    case NAV_TO_GROUPS: {
      return Object.assign({}, state, {
        activeGid: '',
        visibilityFilter: NAV_FILTER_ALL,
        activePageIndex: CAROUSEL_PAGE_GROUPS
      });
    }

    default: {
      return state;
    }
  }
}
