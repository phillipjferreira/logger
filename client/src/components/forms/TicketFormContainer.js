import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import TicketForm from './TicketForm';
import { loadTickets, ticketsNoLoad } from '../../actions/tickets';

const TicketFormContainer = ({
  tickets: { tickets, ticketsLoading },
  loadTickets,
  ticketsNoLoad,
}) => {
  let { ticketid } = useParams();

  useEffect(() => {
    ticketid ? loadTickets(ticketid) : ticketsNoLoad();
  }, [loadTickets, ticketid, ticketsNoLoad]);

  let initialState = {
    name: '',
    key: '',
    id: '',
  };

  if (ticketid) {
    if (!ticketsLoading) {
      initialState = {
        name: tickets.name,
        key: tickets.key,
        id: tickets._id,
      };
    }
  }

  return !ticketsLoading && <TicketForm initialState={initialState} />;
};

TicketFormContainer.propTypes = {
  tickets: PropTypes.object.isRequired,
  loadTickets: PropTypes.func.isRequired,
  ticketsNoLoad: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tickets: state.tickets,
});

export default connect(mapStateToProps, { loadTickets, ticketsNoLoad })(
  withRouter(TicketFormContainer)
);
