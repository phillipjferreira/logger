import {
  PROJECTS_LOADED,
  PROJECTS_ERROR,
  PROJECT_LOADED,
  PROJECT_ERROR,
  PROJECT_RESET,
} from '../actions/types';

const initialState = {
  projects: [],
  selectedProject: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROJECTS_LOADED:
      return { ...state, projects: payload };
    case PROJECTS_ERROR:
      return {
        ...state,
        projects: [...state.projects, { name: 'Error loading Projects' }],
      };
    case PROJECT_LOADED:
      return { ...state, selectedProject: payload };
    case PROJECT_ERROR:
      return { ...state, selectedProject: { name: 'Error selecting Project' } };
    case PROJECT_RESET:
      return { ...state, selectedProject: null };
    default:
      return state;
  }
}
