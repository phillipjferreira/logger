import React, { useEffect, useState, Fragment } from 'react';
import { Button, Container, Row, Col } from 'shards-react';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';
import { createLoadingSelector } from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints, editSprint } from '../actions/sprints';
import { loadTickets, loadTicket, editTicket } from '../actions/tickets';
import TicketLogKanban from '../components/gadgets/TicketLogKanban';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewTicket from '../components/modals/ViewTicket';
import Skeleton from 'react-loading-skeleton';

const TicketLog = ({
  auth: { user },
  projects: { project },
  selectProject,
  sprints: { sprints },
  loadSprints,
  tickets: { tickets, ticket, loading },
  loadTicket,
  loadTickets,
  editTicket,
  editSprint,
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
  }, [setSkip, selectProject, loadSprints, loadTickets, projectid]);

  const onDrag = (card, source, destination) => {
    let temp = destination.toColumnId;
    if (temp === 'Backlog') temp = null;
    if (source.fromColumnId !== destination.toColumnId) {
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

  const updateStatus = (id, newStatus) => {
    let sprint = sprints.find((sprint) => sprint._id === id);
    if (sprint) {
      sprint.status = newStatus;
      sprint.id = id;
      delete sprint._id;
      console.log(history);
      editSprint(sprint, history);
    }
  };

  return skip && !isLoading ? (
    <Fragment>
      <ViewTicket
        user={user}
        ticket={ticket}
        isLoading={loading}
        toggle={toggle}
        open={modalOpen}
      />
      <Container fluid className='main-content-container px-4 custom'>
        <Row noGutters className='page-header pt-4'>
          <Col sm='12' className='text-center, text-md-left, mb-sm-0'>
            <span className='text-uppercase page-subtitle'>{project.name}</span>
            <h2>Ticket Log</h2>
          </Col>
        </Row>
        <hr />
        <Row className='pt-4 px-4 tab-title font-400'>
          <p>Lead: {(project.lead && project.lead.name) || 'N/A'}</p>

          <p>Description: {project.description || 'N/A'}</p>

          {user.role >= 3 && (
            <p>
              <Button className='btn-success' onClick={newSprint}>
                Add New Sprint
              </Button>
            </p>
          )}
        </Row>
        <Row>
          <Col xs='12' className='mx-auto mt-4'>
            <TicketLogKanban
              projectid={projectid}
              user={user}
              onCardDragEnd={onDrag}
              tickets={tickets}
              sprints={sprints}
              view={viewTicket}
              updateStatus={updateStatus}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  ) : (
    <Container fluid className='main-content-container px-4 custom'>
      <Row noGutters className='page-header pt-4'>
        <Col sm='12' className='text-center, text-md-left, mb-sm-0'>
          <span className='text-uppercase page-subtitle'>
            <Skeleton />
          </span>
          <h2>Ticket Log</h2>
        </Col>
      </Row>
      <hr />
      <Row className='pt-4 px-4 tab-title font-400'>
        <Skeleton />
        <Skeleton />
        {user.role >= 3 && <Skeleton />}
      </Row>
      <Row>
        <Col xs='12' className='mx-auto mt-4'>
          <Loader
            type='Oval'
            color='#007bff'
            height={100}
            width={100}
            className='center'
          />
        </Col>
      </Row>
    </Container>
  );
};

TicketLog.propTypes = {
  selectProject: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadTicket: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
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
  auth: state.auth,
});

export default connect(mapStateToProps, {
  selectProject,
  loadSprints,
  loadTickets,
  loadTicket,
  editTicket,
  editSprint,
})(withRouter(TicketLog));
