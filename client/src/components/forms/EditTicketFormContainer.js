import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import EditTicketForm from './EditTicketForm';
import { loadTickets, editTicket } from '../../actions/tickets';

const EditTicketFormContainer = ({
  tickets: { tickets, ticketsLoading },
  loadTickets,
  editTicket,
  history,
}) => {
  let { ticketid } = useParams();

  useEffect(() => {
    loadTickets(ticketid);
  }, [loadTickets, ticketid]);
  useEffect(() => {}, [tickets]);

  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  let initialState = {
    name: '',
    key: '',
    project: '',
    id: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  if (tickets._id !== undefined && tickets._id !== state.id) {
    dispatch({
      name: tickets.name,
      key: tickets.key,
      project: tickets.project,
      id: tickets._id,
    });
  }

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTicket(state, history);
  };

  return (
    !ticketsLoading && (
      <EditTicketForm
        initialState={state}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
  );
};

EditTicketFormContainer.propTypes = {
  tickets: PropTypes.object.isRequired,
  loadTickets: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps, {
  loadTickets,
  editTicket,
})(withRouter(EditTicketFormContainer));
