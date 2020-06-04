import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import SprintForm from './SprintForm';
import { loadSprints } from '../../actions/sprints';

const SprintFormContainer = ({
  sprints: { sprints, sprintsLoading },
  loadSprints,
}) => {
  let { sprintid, projectid } = useParams();

  useEffect(() => {
    projectid && loadSprints(projectid);
  }, [loadSprints, projectid]);

  let initialState = {
    name: '',
    startDate: '',
    endDate: '',
    goal: '',
    id: '',
  };

  if (sprintid) {
    let sprint;
    if (!sprintsLoading) {
      sprint = sprints.find((sprint) => sprintid === sprint._id);
      initialState = {
        name: sprint.name,
        startDate: sprint.startDate || '',
        endDate: sprint.endDate || '',
        goal: sprint.goal || '',
        id: sprint._id,
      };
    }
  }

  return (
    !sprintsLoading && (
      <SprintForm initialState={initialState} projectid={projectid} />
    )
  );
};

SprintFormContainer.propTypes = {
  sprints: PropTypes.object.isRequired,
  loadSprints: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sprints: state.sprints,
});

export default connect(mapStateToProps, { loadSprints })(
  withRouter(SprintFormContainer)
);
