import { TICKETS_LOADED, TICKET_ERROR } from '../actions/types';

const initialState = {
  tickets: [],
  ticket: null,
  ticketsLoading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TICKETS_LOADED:
      return { ...state, tickets: payload, ticketsLoading: false };
    case TICKET_ERROR:
      return {
        ...state,
        tickets: [...state.tickets, { name: 'Error loading tickets' }],
        ticketsLoading: false,
      };
    default:
      return state;
  }
}
