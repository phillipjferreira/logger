import {
  GET_TICKETS_SUCCESS,
  GET_TICKET_REQ,
  GET_TICKET_SUC,
} from '../actions/types';

const initialState = {
  tickets: [],
  ticket: {},
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_TICKETS_SUCCESS:
      return { ...state, tickets: payload };
    case GET_TICKET_SUC:
      return { ...state, ticket: payload, loading: false };
    case GET_TICKET_REQ:
      return { ...state, loading: true };
    default:
      return state;
  }
}
