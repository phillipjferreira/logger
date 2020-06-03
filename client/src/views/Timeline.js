import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { loadProjects } from '../actions/projects';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Timeline = ({
  projects: { projects, projectsLoading },
  loadProjects,
}) => {
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  let { projectkey } = useParams();

  return (
    <div>
      <h1>Timeline</h1>
      <div>
        <h3>{projectkey}</h3>
        {!projectsLoading && (
          <p>{projects.find((project) => project.key === projectkey).name}</p>
        )}
      </div>
    </div>
  );
};

Timeline.propTypes = {
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { loadProjects })(Timeline);
