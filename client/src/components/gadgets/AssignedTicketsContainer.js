import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../../Selectors';
import AssignedTickets from './AssignedTickets';
import ViewTicket from '../modals/ViewTicket';
import { Row, Card, CardHeader } from 'shards-react';
import { loadTicket } from '../../actions/tickets';

const AssignedTicketsContainer = ({
  tickets: { ticket, tickets, loading },
  auth: { user },
  projects: { projects },
  isLoading,
  loadTicket,
}) => {
  const [skip, setSkip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setSkip(true);
  }, []);

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  const viewTicket = (id) => {
    loadTicket(id);
    toggle();
  };

  return (
    skip &&
    !isLoading && (
      <Fragment>
        <ViewTicket
          ticket={ticket}
          isLoading={loading}
          toggle={toggle}
          open={modalOpen}
        />
        <Card small className='h-100'>
          <CardHeader className='border-bottom'>
            <h6 className='m-0'>Tickets Assigned to You</h6>
          </CardHeader>
          <AssignedTickets
            tickets={tickets}
            user={user}
            projects={projects}
            viewTicket={viewTicket}
          />
        </Card>
      </Fragment>
    )
  );
};
const loadingSelector = createLoadingSelector(['GET_TICKETS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  tickets: state.tickets,
  auth: state.auth,
  projects: state.projects,
  users: state.users,
});

export default connect(mapStateToProps, { loadTicket })(
  AssignedTicketsContainer
);
