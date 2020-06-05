import {
  GET_PROJECTS_SUCCESS,
  NEW_PROJECT_SUCCESS,
  SELECT_PROJECT_SUCCESS,
  DESELECT_PROJECT,
} from '../actions/types';

const initialState = {
  projects: [],
  project: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECTS_SUCCESS:
      return { ...state, projects: payload };
    case NEW_PROJECT_SUCCESS:
    case SELECT_PROJECT_SUCCESS:
      return { ...state, project: payload };
    case DESELECT_PROJECT:
      return { ...state, project: {} };
    default:
      return state;
  }
}
