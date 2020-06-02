import axios from 'axios';
import { USERS_LOADED, USERS_ERROR, USER_UPDATED } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load Users
export const loadUsers = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/roles');

    dispatch({
      type: USERS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
    });
    console.log(err);
  }
};

// Update User
export const updateUser = (user) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.put(`/users/${user._id}`, { user });
    dispatch({
      type: USER_UPDATED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: USERS_ERROR,
    });
  }
};
