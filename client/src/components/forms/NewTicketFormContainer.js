import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import NewTicketForm from './NewTicketForm';
import { loadProjects } from '../../actions/projects';
import { loadSprints } from '../../actions/sprints';
import { createTicket } from '../../actions/tickets';

const NewTicketFormContainer = ({
  projects: { projects, selectedProject, projectsLoading },
  loadProjects,
  sprints: { sprints, sprintsLoading },
  loadSprints,
  createTicket,
  history,
}) => {
  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  let initialState = {
    name: '',
    key: '',
    project: '',
    sprint: '',
    id: '',
  };

  if (selectedProject) {
    initialState.project = selectedProject._id;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    loadProjects();
    !projectsLoading && loadSprints(state.project);
  }, [loadProjects, loadSprints, state.project, projectsLoading]);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createTicket(state, history);
  };

  return (
    !projectsLoading &&
    !sprintsLoading && (
      <NewTicketForm
        projects={projects}
        sprints={sprints}
        initialState={state}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
  );
};

NewTicketFormContainer.propTypes = {
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
  sprints: PropTypes.object.isRequired,
  loadSprints: PropTypes.func.isRequired,
  createTicket: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
  sprints: state.sprints,
});

export default connect(mapStateToProps, {
  loadProjects,
  loadSprints,
  createTicket,
})(withRouter(NewTicketFormContainer));
