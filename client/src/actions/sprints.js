import axios from 'axios';
import {
  SPRINTS_LOADED,
  SPRINTS_ERROR,
  SPRINT_LOADED,
  SPRINT_ERROR,
  SPRINT_RESET,
  SPRINT_SAVED,
  SPRINT_NOTSAVED,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Sprints
export const loadSprints = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/sprints');
    dispatch({
      type: SPRINTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SPRINTS_ERROR,
    });
    console.log(err);
  }
};

// Select Sprint
export const selectSprint = (id) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  if (id === null) {
    dispatch({
      type: SPRINT_RESET,
    });
  } else {
    try {
      const res = await axios.get(`/sprints/${id}`);

      dispatch({
        type: SPRINT_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SPRINT_ERROR,
      });
      console.log(err);
    }
  }
};

// Create Sprint
export const createSprint = (formData, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    delete formData.id;
    // !formData.lead && delete formData.lead;
    // !formData.description && delete formData.description;
    const res = await axios.post('/sprints', formData, config);

    dispatch({
      type: SPRINT_SAVED,
      payload: res.data,
    });

    dispatch(setAlert('Sprint Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SPRINT_NOTSAVED,
    });
  }
};

// Edit Sprint
export const editSprint = (formData, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(formData);

  try {
    const id = formData.id;
    delete formData.id;
    // !formData.lead && delete formData.lead;
    // !formData.description && delete formData.description;
    const res = await axios.put(`/sprints/${id}`, formData, config);
    console.log(res);
    dispatch({
      type: SPRINT_SAVED,
      payload: res.data,
    });

    dispatch(setAlert('Sprint Updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: SPRINT_NOTSAVED,
    });
  }
};
