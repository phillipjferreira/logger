import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { loadProjects } from '../actions/projects';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Metrics = ({ projects: { projects, loading }, loadProjects }) => {
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  let { projectid } = useParams();

  return (
    <div>
      <h1>{'Charts & Metrics'}</h1>
      <div>
        <h3>{projectid}</h3>
        {!loading && (
          <p>{projects.find((project) => project._id === projectid).name}</p>
        )}
      </div>
    </div>
  );
};

Metrics.propTypes = {
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { loadProjects })(Metrics);
