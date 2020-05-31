import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from '../actions/types';

const initialState = {
  sidebar: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case OPEN_SIDEBAR:
      return { ...state, sidebar: true };
    case CLOSE_SIDEBAR:
      return { ...state, sidebar: false };
    default:
      return state;
  }
}
