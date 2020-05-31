import { PROJECTS_LOADED, PROJECTS_ERROR } from '../actions/types';

const initialState = {
  projects: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROJECTS_LOADED:
      return { ...state, projects: payload };
    case PROJECTS_ERROR:
      return {
        ...state,
        projects: [...state.projects, { msg: 'Error loading Projects' }],
      };
    default:
      return state;
  }
}
