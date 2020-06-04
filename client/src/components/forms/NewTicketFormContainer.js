import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NewTicketForm from './NewTicketForm';
import { loadProjects } from '../../actions/projects';
import { loadSprints } from '../../actions/sprints';
import { loadUsers } from '../../actions/users';
import { createTicket } from '../../actions/tickets';

const NewTicketFormContainer = ({
  projects: { projects, selectedProject, projectsLoading },
  loadProjects,
  sprints: { sprints, sprintsLoading },
  loadSprints,
  users: { users, usersLoading },
  auth: { user, loading },
  loadUsers,
  createTicket,
  history,
}) => {
  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  useEffect(() => {
    loadProjects();
    loadUsers();
  }, [loadProjects, loadUsers]);

  let initialState = {
    name: '',
    key: '',
    project: '',
    sprint: '',
    assignedTo: '',
    assignedBy: user._id || '',
    id: '',
  };

  if (selectedProject) {
    initialState.project = selectedProject._id;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    !projectsLoading && loadSprints(state.project);
  }, [loadSprints, state.project, projectsLoading]);

  useEffect(() => {
    dispatch({ field: 'sprint', value: '' });
  }, [sprints]);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTicket(state, history);
  };

  return (
    !projectsLoading &&
    !sprintsLoading &&
    !usersLoading &&
    !loading && (
      <NewTicketForm
        projects={projects}
        users={users}
        sprints={sprints}
        initialState={state}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
  );
};

NewTicketFormContainer.propTypes = {
  // projects: PropTypes.array.isRequired,
  loadProjects: PropTypes.func.isRequired,
  // sprints: PropTypes.array.isRequired,
  loadSprints: PropTypes.func.isRequired,
  // users: PropTypes.array.isRequired,
  loadUsers: PropTypes.func.isRequired,
  createTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  sprints: state.sprints,
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadProjects,
  loadSprints,
  loadUsers,
  createTicket,
})(withRouter(NewTicketFormContainer));
