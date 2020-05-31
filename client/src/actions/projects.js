import axios from 'axios';
import { PROJECTS_LOADED } from './types';
import { PROJECTS_ERROR } from './types';

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
