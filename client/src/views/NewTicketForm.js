import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NewTicketDisplay from '../components/forms/NewTicketDisplay';
import { createLoadingSelector } from '../Selectors';
import { loadProjects } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { loadUsers } from '../actions/users';
import { createTicket } from '../actions/tickets';

const NewTicketFormContainer = ({
  projects: { projects, project },
  loadProjects,
  sprints: { sprints },
  loadSprints,
  users: { users },
  loadUsers,
  auth: { user },
  isLoading,
  createTicket,
  history,
}) => {
  useEffect(() => {
    loadProjects();
    loadUsers();
  }, [loadProjects, loadUsers]);

  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  let initialState = {
    name: '',
    storyPoint: '',
    project: project._id || '',
    sprint: '',
    assignedTo: '',
    assignedBy: user._id || '',
    description: '',
    id: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    state.project && loadSprints(state.project);
  }, [state.project, loadSprints]);

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
    !isLoading && (
      <NewTicketDisplay
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

const loadingSelector = createLoadingSelector(['GET_USERS', 'GET_PROJECTS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
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
