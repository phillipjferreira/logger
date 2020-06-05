import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Metrics = ({ projects: { project }, selectProject, isLoading }) => {
  let { projectid } = useParams();

  useEffect(() => {
    selectProject(projectid);
  }, [selectProject, projectid]);

  return (
    !isLoading && (
      <div>
        <h1>{'Charts & Metrics'}</h1>
        <div>
          <h3>{projectid}</h3>
          <p>{project.name}</p>
        </div>
      </div>
    )
  );
};

Metrics.propTypes = {
  projects: PropTypes.object.isRequired,
  selectProject: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector(['SELECT_PROJECT']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
});

export default connect(mapStateToProps, { selectProject })(Metrics);
