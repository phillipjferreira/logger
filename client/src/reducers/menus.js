import { TOGGLE_SIDEBAR } from '../actions/types';

const initialState = {
  sidebar: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case TOGGLE_SIDEBAR:
      return { ...state, sidebar: !state.sidebar };
    default:
      return state;
  }
}
