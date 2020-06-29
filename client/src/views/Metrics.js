import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'shards-react';
import { withRouter } from 'react-router-dom';
import {
  createLoadingSelector,
  createBurndownChartSelector,
} from '../Selectors';
import Loader from 'react-loader-spinner';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints, getSprintHistory } from '../actions/sprints';
import { loadTickets, loadTicket } from '../actions/tickets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BurndownChart from '../components/gadgets/BurndownChart';
import MetricsForm from '../components/forms/MetricsForm';
import Skeleton from 'react-loading-skeleton';

const Metrics = ({
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
    loadSprints(projectid);
  }, [setSkip, selectProject, loadSprints, projectid]);

  const onChange = (e) => {
    setSprint(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    loadTickets(sprint, 'sprint');
    getSprintHistory(sprint);
  };

  return skip && !isLoading ? (
    <Container fluid className='main-content-container px-4 custom'>
      <Row noGutters className='page-header pt-4'>
        <Col xs='12' sm='4' className='text-center, text-md-left, mb-sm-0'>
          <span className='text-uppercase page-subtitle'>{project.name}</span>
          <h2>Charts</h2>
        </Col>
      </Row>
      <hr />
      <Row className='pt-4 px-4 tab-title font-400'>
        <p>Lead: {project.lead.name || 'N/A'}</p>

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
            <BurndownChart sprintData={sprintData} />
          </Col>
        </Row>
      )}
    </Container>
  ) : (
    <Container fluid className='main-content-container px-4 custom'>
      <Row noGutters className='page-header pt-4'>
        <Col xs='12' sm='4' className='text-center, text-md-left, mb-sm-0'>
          <span className='text-uppercase page-subtitle'>
            <Skeleton />
          </span>
          <h2>Charts</h2>
        </Col>
      </Row>
      <hr />
      <Row className='pt-4 px-4 tab-title font-400'>
        <Skeleton />
        <Skeleton />
      </Row>

      <Loader
        type='Oval'
        color='#007bff'
        height={100}
        width={100}
        className='center'
      />
    </Container>
  );
};

Metrics.propTypes = {
  selectProject: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadTicket: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
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
  selectProject,
  loadSprints,
  getSprintHistory,
  loadTickets,
  loadTicket,
})(withRouter(Metrics));
