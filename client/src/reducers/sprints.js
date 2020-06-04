import { SPRINTS_LOADED, SPRINT_ERROR } from '../actions/types';

const initialState = {
  sprints: [],
  sprintsLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SPRINTS_LOADED:
      return { ...state, sprints: payload, sprintsLoading: false };
    case SPRINT_ERROR:
      return {
        ...state,
        sprints: [...state.sprints, { name: 'Error loading sprints' }],
        sprintsLoading: false,
      };
    default:
      return state;
  }
}
