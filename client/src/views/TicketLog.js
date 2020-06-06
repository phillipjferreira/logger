import React, { useEffect, Fragment } from 'react';
import { Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { loadTickets } from '../actions/tickets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TicketLog = ({
  projects: { project },
  selectProject,
  sprints: { sprints },
  loadSprints,
  tickets: { tickets },
  loadTickets,
  isLoading,
}) => {
  let { projectid } = useParams();
  useEffect(() => {
    selectProject(projectid);
    loadSprints(projectid);
    loadTickets(projectid, 'project');
  }, []);

  return (
    !isLoading && (
      <div>
        <h1>Ticket Log</h1>
        <div>
          <h2>Project</h2>
          <h3>{projectid}</h3>
          <p>{project.name}</p>
          <h2>Sprints</h2>

          {sprints.map((sprint) => (
            <Fragment key={sprint._id}>
              <p>{sprint.name}</p>
              <Button
                tag={RouteNavLink}
                to={`/projects/${projectid}/${sprint._id}/edit-sprint`}
                className='edit-sprint btn-success'>
                + Edit Sprint
              </Button>
            </Fragment>
          ))}

          {Array.isArray(tickets) &&
            tickets.map((ticket) => (
              <Fragment key={ticket._id}>
                <h4>{ticket.name}</h4>
                <Button
                  tag={RouteNavLink}
                  to={`/projects/${projectid}/${ticket._id}/edit-ticket`}
                  className='edit-ticket btn-success'>
                  + Edit Ticket
                </Button>
              </Fragment>
            ))}
        </div>
        <Button
          tag={RouteNavLink}
          to={`/projects/${projectid}/new-sprint`}
          className='edit-sprint btn-success'>
          + New Sprint
        </Button>
        {/* <Button>Edit Sprint</Button> */}
      </div>
    )
  );
};

TicketLog.propTypes = {
  selectProject: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
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
})(TicketLog);
