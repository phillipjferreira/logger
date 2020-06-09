import React, { useEffect, useState, Fragment } from 'react';
import { Button, Container, Row, Col } from 'shards-react';
import { withRouter } from 'react-router-dom';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { loadTickets, loadTicket, editTicket } from '../actions/tickets';
import CustomBoard from '../components/gadgets/CustomBoard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewTicket from '../components/modals/ViewTicket';

const TicketLog = ({
  projects: { project },
  selectProject,
  sprints: { sprints },
  loadSprints,
  tickets: { tickets, ticket, loading },
  loadTicket,
  loadTickets,
  editTicket,
  isLoading,
  history,
}) => {
  const { projectid } = useParams();
  const [skip, setSkip] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setSkip(true);
    selectProject(projectid);
    loadSprints(projectid);
    loadTickets(projectid, 'project');
  }, []);

  const onDrag = (card, source, destination) => {
    let temp = destination.toColumnId;
    if (temp === 'Backlog') temp = null;
    if (source.fromColumnId != destination.toColumnId) {
      editTicket({
        id: card.id,
        sprint: temp,
      });
    }
  };

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  const viewTicket = (id) => {
    loadTicket(id);
    toggle();
  };

  const newSprint = () => {
    history.push(`/projects/${projectid}/new-sprint`);
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
        <Container fluid className='main-content-container px-4 custom'>
          <Row noGutters className='page-header pt-4'>
            <Col xs='12' sm='4' className='text-center, text-md-left, mb-sm-0'>
              <span className='text-uppercase page-subtitle'>
                {project.name}
              </span>
              <h2>Ticket Log</h2>
            </Col>
          </Row>
          <hr />
          <Row className='pt-4 px-4 tab-title'>
            <p>Lead: {project.lead || 'N/A'}</p>

            <p>Description: {project.description || 'N/A'}</p>

            <p>
              <Button className='btn-success' onClick={newSprint}>
                Add New Sprint
              </Button>
            </p>
          </Row>
          <Row>
            <Col lg='12' className='mx-auto mt-4'>
              <CustomBoard
                onCardDragEnd={onDrag}
                tickets={tickets}
                sprints={sprints}
                view={viewTicket}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  );
};

TicketLog.propTypes = {
  selectProject: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadTicket: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
  'GET_TICKETS',
  'GET_SPRINTS',
  'SELECT_PROJECT',
]);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
  sprints: state.sprints,
  tickets: state.tickets,
});

export default connect(mapStateToProps, {
  selectProject,
  loadSprints,
  loadTickets,
  loadTicket,
  editTicket,
})(withRouter(TicketLog));
