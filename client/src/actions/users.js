import axios from 'axios';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load Users
export const loadUsers = () => async (dispatch) => {
  dispatch({
    type: GET_USERS_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/roles');

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_USERS_ERROR,
    });
    console.log(err);
  }
};

// Update User
export const updateUser = (user) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.put(`/users/${user._id}`, { user });
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ERROR,
    });
  }
};
