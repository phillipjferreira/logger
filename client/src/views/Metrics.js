import React, { useEffect, useState, Fragment } from 'react';
import { Container, Row, Col } from 'shards-react';
import { withRouter } from 'react-router-dom';
import {
  createLoadingSelector,
  createBurndownChartSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints, getSprintHistory } from '../actions/sprints';
import { loadTickets, loadTicket } from '../actions/tickets';
import { loadUsers } from '../actions/users';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BurndownContainer from '../components/gadgets/BurndownContainer';
import MetricsForm from '../components/forms/MetricsForm';

const Metrics = ({
  users: { users },
  loadUsers,
  projects: { project },
  selectProject,
  sprintData,
  sprints: { sprints, historyLoading },
  loadSprints,
  getSprintHistory,
  loadTickets,
  isLoading,
  isTicketsLoading,
}) => {
  const { projectid } = useParams();
  const [skip, setSkip] = useState(false);
  const [show, setShow] = useState(false);
  const [sprint, setSprint] = useState('');

  useEffect(() => {
    setSkip(true);
    selectProject(projectid);
    loadUsers();
    loadSprints(projectid);
  }, []);

  const onChange = (e) => {
    setSprint(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    loadTickets(sprint, 'sprint');
    getSprintHistory(sprint);
  };

  return (
    skip &&
    !isLoading && (
      <Fragment>
        <Container fluid className='main-content-container px-4 custom'>
          <Row noGutters className='page-header pt-4'>
            <Col xs='12' sm='4' className='text-center, text-md-left, mb-sm-0'>
              <span className='text-uppercase page-subtitle'>
                {project.name}
              </span>
              <h2>Charts</h2>
            </Col>
          </Row>
          <hr />
          <Row className='pt-4 px-4 tab-title font-400'>
            <p>
              Lead:{' '}
              {(project.lead &&
                users.find((obj) => obj._id === project.lead).name) ||
                'N/A'}
            </p>

            <p>Description: {project.description || 'N/A'}</p>
          </Row>
          <Row>
            <Col lg='12' className='mx-auto mt-4'>
              <MetricsForm
                sprints={sprints}
                sprint={sprint}
                onChange={onChange}
                onSubmit={onSubmit}
              />
            </Col>
          </Row>
          {show && !historyLoading && !isTicketsLoading && (
            <Row>
              <Col lg='12' className='mx-auto mt-4'>
                <BurndownContainer sprintData={sprintData} />
              </Col>
            </Row>
          )}
        </Container>
      </Fragment>
    )
  );
};

Metrics.propTypes = {
  selectProject: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadTicket: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
  'GET_USERS',
  'GET_SPRINTS',
  'SELECT_PROJECT',
]);

const ticketLoadingSelector = createLoadingSelector(['GET_TICKETS']);

const burndownChartSelector = createBurndownChartSelector();
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  isTicketsLoading: ticketLoadingSelector(state),
  sprintData: burndownChartSelector(state),
  users: state.users,
  projects: state.projects,
  sprints: state.sprints,
  tickets: state.tickets,
});

export default connect(mapStateToProps, {
  loadUsers,
  selectProject,
  loadSprints,
  getSprintHistory,
  loadTickets,
  loadTicket,
})(withRouter(Metrics));
