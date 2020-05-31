import axios from 'axios';
import {
  PROJECTS_LOADED,
  PROJECTS_ERROR,
  PROJECT_LOADED,
  PROJECT_ERROR,
  PROJECT_RESET,
} from './types';

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
