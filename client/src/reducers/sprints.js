import {
  SPRINTS_LOADED,
  SPRINTS_ERROR,
  SPRINT_LOADED,
  SPRINT_ERROR,
  SPRINT_RESET,
  SPRINT_SAVED,
  SPRINT_NOTSAVED,
} from '../actions/types';

const initialState = {
  sprints: [],
  activeSprint: null,
  sprintsLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SPRINTS_LOADED:
      return { ...state, sprints: payload, sprintsLoading: false };
    case SPRINTS_ERROR:
      return {
        ...state,
        sprints: [...state.sprints, { name: 'Error loading Sprints' }],
        sprintsLoading: false,
      };
    case SPRINT_LOADED:
      return { ...state, activeSprint: payload, sprintsLoading: false };
    case SPRINT_ERROR:
      return {
        ...state,
        activeSprint: { name: 'Error selecting Sprint' },
        sprintsLoading: false,
      };
    case SPRINT_RESET:
      return { ...state, activeSprint: null, sprintsLoading: false };
    case SPRINT_SAVED:
      return { ...state, activeSprint: payload, sprintsLoading: false };
    case SPRINT_NOTSAVED:
      return {
        ...state,
        activeSprint: { name: 'Error saving Sprint' },
        sprintsLoading: false,
      };
    default:
      return state;
  }
}
