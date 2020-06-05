import { GET_TICKETS_SUCCESS } from '../actions/types';

const initialState = {
  tickets: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TICKETS_SUCCESS:
      return { ...state, tickets: payload };
    default:
      return state;
  }
}
