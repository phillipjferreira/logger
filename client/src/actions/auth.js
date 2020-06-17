import axios from 'axios';
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
} from './types';
import { setAlert } from './alert';
import { loadUsers } from './users';
import { loadProjects } from './projects';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  dispatch({
    type: LOAD_USER_REQ,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/auth');

    dispatch({
      type: LOAD_USER_SUC,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_ERR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  dispatch({
    type: REGISTER_REQ,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { name, email, password };

  try {
    const res = await axios.post('/users', body, config);
    dispatch({
      type: REGISTER_SUC,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(loadUsers());
    dispatch(loadProjects());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_ERR,
    });
  }
};

// Login User
export const login = (email, password, demo) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQ,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = { email, password, demo };

  try {
    const res = await axios.post('/auth', body, config);

    dispatch({
      type: LOGIN_SUC,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(loadUsers());
    dispatch(loadProjects());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_ERR,
    });
  }
};

// Logout User / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
