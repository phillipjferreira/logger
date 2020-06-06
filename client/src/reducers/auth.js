import {
  LOAD_USER_REQ,
  LOAD_USER_SUC,
  LOAD_USER_ERR,
  REGISTER_REQ,
  REGISTER_SUC,
  REGISTER_ERR,
  LOGIN_REQ,
  LOGIN_SUC,
  LOGIN_ERR,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  user: {},
  isAuthenticated: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_USER_REQ:
    case REGISTER_REQ:
    case LOGIN_REQ:
      return {
        ...state,
        loading: true,
      };
    case LOAD_USER_SUC:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        loading: false,
      };
    case REGISTER_SUC:
    case LOGIN_SUC:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case LOAD_USER_ERR:
    case REGISTER_ERR:
    case LOGIN_ERR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: '',
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
