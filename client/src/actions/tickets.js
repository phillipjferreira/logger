import axios from 'axios';
import {
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_ERROR,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Tickets
export const loadTickets = (id, filter) => async (dispatch) => {
  dispatch({
    type: GET_TICKETS_REQUEST,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    let res;
    if (filter) {
      // Load Tickets by Project/ Sprint (for TicketLog/ Board)
      res = await axios.get(`/tickets/${filter}/${id}`);
    } else if (id) {
      // Load Tickets by ID (for TicketForm)
      res = await axios.get(`/tickets/${id}`);
    } else {
      // Load All Tickets (for Dashboard)
      res = await axios.get('/tickets');
    }

    dispatch({
      type: GET_TICKETS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_TICKETS_ERROR,
    });
    dispatch(setAlert('Error loading tickets', 'danger'));
  }
};

// Create Ticket
export const createTicket = (formData, history) => async (dispatch) => {
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
    !formData.sprint && delete formData.sprint;
    await axios.post('/tickets', formData, config);

    dispatch(setAlert('Ticket Created', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

// Edit Ticket
export const editTicket = (formData, history) => async (dispatch) => {
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
    await axios.put(`/tickets/${id}`, formData, config);

    dispatch(setAlert('Ticket Updated', 'success'));

    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
