import axios from 'axios';
import {
  GET_SPRINTS_REQUEST,
  GET_SPRINTS_SUCCESS,
  GET_SPRINTS_ERROR,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Sprints
export const loadSprints = (projectid) => async (dispatch) => {
  dispatch({
    type: GET_SPRINTS_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    // Load Sprints by Project ID (for TicketLog and Board)
    const res = await axios.get(`/sprints/${projectid}`);
    
    dispatch({
      type: GET_SPRINTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_SPRINTS_ERROR,
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

    history.goBack();
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

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
