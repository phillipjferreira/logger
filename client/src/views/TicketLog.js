import React, { useEffect, Fragment } from 'react';
import { Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { useParams } from 'react-router';
import { loadProjects } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TicketLog = ({
  projects: { projects, projectsLoading },
  loadProjects,
  sprints: { sprints, sprintsLoading },
  loadSprints,
}) => {
  useEffect(() => {
    loadProjects();
    loadSprints();
  }, [loadProjects, loadSprints]);

  let { projectid } = useParams();

  return (
    <div>
      <h1>Ticket Log</h1>
      <div>
        <h2>Project</h2>
        <h3>{projectid}</h3>
        {!projects && (
          <p>
            {projectsLoading.find((project) => project._id === projectid).name}
          </p>
        )}
        <h2>Sprints</h2>
        {!sprintsLoading &&
          sprints.map((sprint) => (
            <Fragment>
              <p>{sprint.name}</p>{' '}
              <Button
                tag={RouteNavLink}
                to={`/${projectid}/edit-sprint/${sprint._id}`}
                className='edit-sprint btn-success'>
                + Edit Sprint
              </Button>
            </Fragment>
          ))}
      </div>
      <Button
        tag={RouteNavLink}
        to={`/${projectid}/edit-sprint`}
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
  loadProjects: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  sprints: state.sprints,
});

export default connect(mapStateToProps, { loadProjects, loadSprints })(
  TicketLog
);
