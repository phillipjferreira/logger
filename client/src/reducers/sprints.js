import { GET_SPRINTS_SUCCESS } from '../actions/types';

const initialState = {
  sprints: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SPRINTS_SUCCESS:
      return { ...state, sprints: payload };
    default:
      return state;
  }
}
