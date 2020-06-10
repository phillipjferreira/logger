import axios from 'axios';
import {
  GET_TICKET_REQ,
  GET_TICKET_SUC,
  GET_TICKET_ERR,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_ERROR,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// Load Ticket by id
export const loadTicket = (id) => async (dispatch) => {
  dispatch({
    type: GET_TICKET_REQ,
  });
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`/tickets/${id}`);
    const test = await axios.get(`/history/${id}`);
    // console.log(test.data);

    dispatch({
      type: GET_TICKET_SUC,
      payload: { ...res.data, history: test.data },
    });
  } catch (err) {
    dispatch({
      type: GET_TICKET_ERR,
    });
    dispatch(setAlert('Error loading ticket', 'danger'));
  }
};

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
    !formData.storyPoint && delete formData.storyPoint;
    !formData.assignedTo && delete formData.assignedTo;
    !formData.description && delete formData.description;
    await axios.post('/tickets', formData, config);

    dispatch(setAlert('Ticket Created', 'success'));

    history.goBack();
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
    !formData.assignedTo && delete formData.assignedTo;
    !formData.lead && delete formData.lead;
    !formData.description && delete formData.description;
    await axios.put(`/tickets/${id}`, formData, config);

    dispatch(setAlert('Ticket Updated', 'success'));

    history && history.goBack();
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
