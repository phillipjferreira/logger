import axios from 'axios';
import {
  PROJECTS_LOADED,
  PROJECTS_ERROR,
  PROJECT_LOADED,
  PROJECT_ERROR,
  PROJECT_RESET,
  PROJECT_SAVED,
  PROJECT_NOTSAVED,
} from './types';
import { setAlert } from './alert';

// Load Projects
export const loadProjects = () => async (dispatch) => {
  try {
    const res = await axios.get('/projects');

    dispatch({
      type: PROJECTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECTS_ERROR,
    });
    console.log(err);
  }
};

// Select Project
export const selectProject = (id) => async (dispatch) => {
  if (id === null) {
    dispatch({
      type: PROJECT_RESET,
    });
  } else {
    try {
      const res = await axios.get(`/projects/${id}`);

      dispatch({
        type: PROJECT_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: PROJECT_ERROR,
      });
      console.log(err);
    }
  }
};

// Create Project
export const createProject = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    delete formData.id;
    const res = await axios.post('/projects', formData, config);

    dispatch({
      type: PROJECT_SAVED,
      payload: res.data,
    });

    dispatch(setAlert('Project Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROJECT_NOTSAVED,
    });
  }
};

// Edit Project
export const editProject = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const id = formData.id;
    delete formData.id;
    const res = await axios.put(`/projects/${id}`, formData, config);

    dispatch({
      type: PROJECT_SAVED,
      payload: res.data,
    });

    dispatch(setAlert('Project Updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROJECT_NOTSAVED,
    });
  }
};
