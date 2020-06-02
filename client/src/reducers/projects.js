import {
  PROJECTS_LOADED,
  PROJECTS_ERROR,
  PROJECT_LOADED,
  PROJECT_ERROR,
  PROJECT_RESET,
  PROJECT_SAVED,
  PROJECT_NOTSAVED,
} from '../actions/types';

const initialState = {
  projects: [],
  selectedProject: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROJECTS_LOADED:
      return { ...state, projects: payload, loading: false };
    case PROJECTS_ERROR:
      return {
        ...state,
        projects: [...state.projects, { name: 'Error loading Projects' }],
        loading: false,
      };
    case PROJECT_LOADED:
      return { ...state, selectedProject: payload, loading: false };
    case PROJECT_ERROR:
      return {
        ...state,
        selectedProject: { name: 'Error selecting Project' },
        loading: false,
      };
    case PROJECT_RESET:
      return { ...state, selectedProject: null, loading: false };
    case PROJECT_SAVED:
      return { ...state, selectedProject: payload, loading: false };
    case PROJECT_NOTSAVED:
      return {
        ...state,
        selectedProject: { name: 'Error saving Project' },
        loading: false,
      };
    default:
      return state;
  }
}
