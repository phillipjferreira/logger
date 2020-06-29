import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SELECT_SIDEBAR_PROJECT_SUCCESS,
  DESELECT_SIDEBAR_PROJECT,
} from '../actions/types';

const initialState = {
  sidebar: false,
  project: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case OPEN_SIDEBAR:
      return { ...state, sidebar: true };
    case CLOSE_SIDEBAR:
      return { ...state, sidebar: false };
    case SELECT_SIDEBAR_PROJECT_SUCCESS:
      return { ...state, project: payload };
    case DESELECT_SIDEBAR_PROJECT:
      return { ...state, project: {} };
    default:
      return state;
  }
}
