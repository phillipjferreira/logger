import React, { useEffect, Fragment } from 'react';
import { Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { loadProjects } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { loadTickets } from '../actions/tickets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TicketLog = ({
  projects: { projects, projectsLoading },
  loadProjects,
  sprints: { sprints, sprintsLoading },
  loadSprints,
  tickets: { tickets, ticketsLoading },
  loadTickets,
}) => {
  let { projectid } = useParams();
  useEffect(() => {
    loadProjects();
    loadSprints();
    loadTickets(projectid, 'project');
  }, [loadProjects, loadSprints, loadTickets, projectid]);

  let project;
  if (!projectsLoading) {
    project = projects.find((project) => projectid === project._id);
  }

  return (
    <div>
      <h1>Ticket Log</h1>
      <div>
        <h2>Project</h2>
        <h3>{projectid}</h3>
        {!projectsLoading && <p>{project.name}</p>}
        <h2>Sprints</h2>
        {!sprintsLoading &&
          sprints.map(
            (sprint) =>
              project._id === sprint.project && (
                <Fragment>
                  <p>{sprint.name}</p>{' '}
                  <Button
                    tag={RouteNavLink}
                    to={`/projects/${projectid}/${sprint._id}/edit-sprint`}
                    className='edit-sprint btn-success'>
                    + Edit Sprint
                  </Button>
                </Fragment>
              )
          )}
        {!ticketsLoading &&
          tickets &&
          tickets.map((ticket) => <h4>{ticket.name}</h4>)}
      </div>
      <Button
        tag={RouteNavLink}
        to={`/projects/${projectid}/new-sprint`}
        className='edit-sprint btn-success'>
        + New Sprint
      </Button>
      {/* <Button>Edit Sprint</Button> */}
    </div>
  );
};

TicketLog.propTypes = {
  projects: PropTypes.object.isRequired,
  sprints: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  sprints: state.sprints,
  tickets: state.tickets,
});

export default connect(mapStateToProps, {
  loadProjects,
  loadSprints,
  loadTickets,
})(TicketLog);
