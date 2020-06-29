import {
  OPEN_SIDEBAR,
  CLOSE_SIDEBAR,
  SELECT_SIDEBAR_PROJECT_REQUEST,
  DESELECT_SIDEBAR_PROJECT,
  SELECT_SIDEBAR_PROJECT_SUCCESS,
  SELECT_SIDEBAR_PROJECT_ERROR,
} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

export const openSidebar = () => (dispatch) => {
  dispatch({
    type: OPEN_SIDEBAR,
  });
};

export const closeSidebar = () => (dispatch) => {
  dispatch({
    type: CLOSE_SIDEBAR,
  });
};

// Select Project for Sidebar
export const selectSidebarProject = (id) => async (dispatch) => {
  dispatch({
    type: SELECT_SIDEBAR_PROJECT_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  if (id === null) {
    dispatch({
      type: DESELECT_SIDEBAR_PROJECT,
    });
  } else {
    try {
      const res = await axios.get(`/projects/${id}`);

      dispatch({
        type: SELECT_SIDEBAR_PROJECT_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SELECT_SIDEBAR_PROJECT_ERROR,
      });
      console.log(err);
    }
  }
};
