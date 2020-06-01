import axios from 'axios';
import { USERS_LOADED, USERS_ERROR, USER_UPDATED } from './types';

// Load Users
export const loadUsers = () => async (dispatch) => {
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
  try {
    const res = await axios.put(`/users/${user._id}`, { user });
    console.log(user._id);
    console.log(user);
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
