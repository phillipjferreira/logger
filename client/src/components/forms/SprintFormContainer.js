import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import SprintForm from './SprintForm';
import { loadSprints } from '../../actions/sprints';
import { loadProjects } from '../../actions/projects';

const SprintFormContainer = ({
  sprints: { sprints, sprintsLoading },
  projects: { projects, projectsLoading },
  loadSprints,
  loadProjects,
}) => {
  useEffect(() => {
    loadSprints();
    loadProjects();
  }, [loadSprints, loadProjects]);

  let initialState = {
    name: '',
    startDate: '',
    endDate: '',
    goal: '',
    id: '',
  };

  let { sprintid, projectid } = useParams();

  if (sprintid) {
    let sprint;
    if (!sprintsLoading) {
      sprint = sprints.find((sprint) => sprintid === sprint._id);
      initialState = {
        name: sprint.name,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        goal: sprint.goal,
        id: sprint._id,
      };
    }
  }

  return (
    !sprintsLoading &&
    !projectsLoading && (
      <SprintForm initialState={initialState} projectid={projectid} />
    )
  );
};

SprintFormContainer.propTypes = {
  sprints: PropTypes.object.isRequired,
  loadSprints: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sprints: state.sprints,
  projects: state.projects,
});

export default connect(mapStateToProps, { loadSprints, loadProjects })(
  withRouter(SprintFormContainer)
);
