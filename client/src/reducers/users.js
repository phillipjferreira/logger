import { USERS_LOADED, USERS_ERROR, USER_UPDATED } from '../actions/types';

const initialState = {
  users: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USERS_LOADED:
      return { ...state, users: payload, loading: false };
    case USER_UPDATED:
      let objIndex = state.users.findIndex((user) => user._id === payload._id);
      return { ...state, [objIndex]: payload, loading: false };
    case USERS_ERROR:
      return {
        ...state,
        users: [...state.users, { name: 'Error loading Users' }],
        loading: false,
      };
    default:
      return state;
  }
}
