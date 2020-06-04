import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import ProjectForm from './ProjectForm';
import { loadProjects } from '../../actions/projects';
import { loadUsers } from '../../actions/users';

const ProjectFormContainer = ({
  projects: { projects, projectsLoading },
  users: { users, loading },
  loadProjects,
  loadUsers,
}) => {
  useEffect(() => {
    loadProjects();
    loadUsers();
  }, [loadProjects, loadUsers]);

  let initialState = {
    name: '',
    key: '',
    lead: '',
    description: '',
    id: '',
  };

  let { projectid } = useParams();

  if (projectid) {
    let project;
    if (!projectsLoading) {
      project = projects.find((project) => projectid === project._id);
      initialState = {
        name: project.name,
        key: project.key,
        lead: project.lead || '',
        description: project.description || '',
        id: project._id,
      };
    }
  }

  return (
    !projectsLoading &&
    !loading && <ProjectForm initialState={initialState} users={users} />
  );
};

ProjectFormContainer.propTypes = {
  projects: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  users: state.users,
});

export default connect(mapStateToProps, { loadProjects, loadUsers })(
  withRouter(ProjectFormContainer)
);
