import { GET_USERS_SUCCESS, UPDATE_USER_SUCCESS } from '../actions/types';

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS_SUCCESS:
      return { ...state, users: payload };
    case UPDATE_USER_SUCCESS:
      let objIndex = state.users.findIndex((user) => user._id === payload._id);
      return { ...state, [objIndex]: payload };
    default:
      return state;
  }
}
