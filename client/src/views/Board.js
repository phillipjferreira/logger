import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { loadProjects } from '../actions/projects';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Board = ({ projects: { projects, loading }, loadProjects }) => {
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  let { projectkey } = useParams();

  return (
    <div>
      <h1>Sprint Board</h1>
      <div>
        <h3>{projectkey}</h3>
        {!loading && (
          <p>{projects.find((project) => project.key === projectkey).name}</p>
        )}
      </div>
    </div>
  );
};

Board.propTypes = {
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { loadProjects })(Board);
