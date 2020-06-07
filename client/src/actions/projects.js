import axios from 'axios';
import {
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  NEW_PROJECT_REQUEST,
  NEW_PROJECT_SUCCESS,
  NEW_PROJECT_ERROR,
  SELECT_PROJECT_REQUEST,
  SELECT_PROJECT_SUCCESS,
  SELECT_PROJECT_ERROR,
  DESELECT_PROJECT,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Projects
export const loadProjects = () => async (dispatch) => {
  dispatch({
    type: GET_PROJECTS_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/projects');
    dispatch({
      type: GET_PROJECTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_PROJECTS_ERROR,
    });
    console.log(err);
  }
};

// Select Project
export const selectProject = (id) => async (dispatch) => {
  dispatch({
    type: SELECT_PROJECT_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  if (id === null) {
    dispatch({
      type: DESELECT_PROJECT,
    });
  } else {
    try {
      const res = await axios.get(`/projects/${id}`);

      dispatch({
        type: SELECT_PROJECT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SELECT_PROJECT_ERROR,
      });
      console.log(err);
    }
  }
};

// Create Project
export const createProject = (formData, history) => async (dispatch) => {
  dispatch({
    type: NEW_PROJECT_REQUEST,
  });
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
    !formData.lead && delete formData.lead;
    !formData.description && delete formData.description;
    const res = await axios.post('/projects', formData, config);

    dispatch({
      type: NEW_PROJECT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Project Created', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: NEW_PROJECT_ERROR,
    });
  }
};

// Edit Project
export const editProject = (formData, history) => async (dispatch) => {
  dispatch({
    type: NEW_PROJECT_REQUEST,
  });
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
    !formData.lead && delete formData.lead;
    !formData.description && delete formData.description;
    const res = await axios.put(`/projects/${id}`, formData, config);

    dispatch({
      type: NEW_PROJECT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Project Updated', 'success'));

    history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: NEW_PROJECT_ERROR,
    });
  }
};
