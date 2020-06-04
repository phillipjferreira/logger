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

  useEffect(() => {
    if (!ticketsLoading) {
      dispatch({ field: 'name', value: tickets.name });
      dispatch({ field: 'key', value: tickets.key });
      dispatch({ field: 'project', value: tickets.project });
      dispatch({ field: 'id', value: tickets._id });
    }
  }, [tickets, ticketsLoading]);

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
