import axios from 'axios';
import { SPRINTS_LOADED, SPRINT_ERROR } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Sprints
export const loadSprints = (projectid) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // Load Sprints by Project ID (for TicketLog, filter Active sprint for Board)
    const res = await axios.get(`/sprints/${projectid}`);

    dispatch({
      type: SPRINTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SPRINT_ERROR,
    });
    dispatch(setAlert('Error loading sprints', 'danger'));
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
    await axios.post('/sprints', formData, config);

    dispatch(setAlert('Sprint Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
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

  try {
    const id = formData.id;
    delete formData.id;
    // !formData.lead && delete formData.lead;
    // !formData.description && delete formData.description;
    await axios.put(`/sprints/${id}`, formData, config);

    dispatch(setAlert('Sprint Updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
