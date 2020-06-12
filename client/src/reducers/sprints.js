import {
  GET_SPRINTS_SUCCESS,
  GET_SPRINT_HISTORY_REQ,
  GET_SPRINT_HISTORY_SUC,
} from '../actions/types';

const initialState = {
  sprints: [],
  sprintHistory: {},
  historyLoading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SPRINTS_SUCCESS:
      return { ...state, sprints: payload };
    case GET_SPRINT_HISTORY_REQ:
      return { ...state, historyLoading: true };
    case GET_SPRINT_HISTORY_SUC:
      return { ...state, sprintHistory: payload, historyLoading: false };
    default:
      return state;
  }
}
