import React, { useEffect, useReducer, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import EditTicketDisplay from '../components/forms/EditTicketDisplay';
import { createLoadingSelector } from '../Selectors';
import { loadProjects } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { loadUsers } from '../actions/users';
import { loadTickets, editTicket } from '../actions/tickets';
import { removeTicket } from '../actions/tickets';

const EditTicketFormContainer = ({
  auth: { user },
  tickets: { tickets },
  sprints: { sprints },
  projects: { projects },
  users: { users },
  loadTickets,
  loadSprints,
  loadProjects,
  loadUsers,
  editTicket,
  history,
  isLoading,
  removeTicket,
}) => {
  const { ticketid } = useParams();
  const { projectid } = useParams();
  const isInitialMount = useRef(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    loadTickets(ticketid);
    loadProjects();
    loadUsers();
    loadSprints(projectid);
  }, [loadTickets, loadProjects, loadUsers, loadSprints, ticketid, projectid]);

  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  let initialState = {
    storyPoint: '',
    name: '',
    status: '',
    project: '',
    sprint: '',
    assignedTo: '',
    assignedBy: '',
    created: '',
    updated: '',
    description: '',
    id: '',
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch({ field: 'storyPoint', value: tickets.storyPoint });
      dispatch({ field: 'name', value: tickets.name });
      dispatch({ field: 'status', value: tickets.status });
      dispatch({ field: 'project', value: tickets.project });
      dispatch({ field: 'sprint', value: tickets.sprint });
      dispatch({ field: 'assignedTo', value: tickets.assignedTo });
      dispatch({ field: 'assignedBy', value: tickets.assignedBy });
      dispatch({ field: 'created', value: tickets.created });
      dispatch({ field: 'updated', value: new Date() });
      dispatch({ field: 'description', value: tickets.description });
      dispatch({ field: 'id', value: tickets._id });
    }
  }, [tickets]);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({ field: 'updated', value: new Date().toString() });
    editTicket(state, history);
  };

  const onDelete = () => {
    removeTicket(ticketid, history);
  };

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    !isLoading && (
      <EditTicketDisplay
        initialState={state}
        sprints={sprints}
        projects={projects}
        users={users}
        user={user}
        lastUpdated={tickets.updated}
        onChange={onChange}
        onSubmit={onSubmit}
        onDelete={onDelete}
        toggle={toggle}
        open={modalOpen}
      />
    )
  );
};

EditTicketFormContainer.propTypes = {
  tickets: PropTypes.object.isRequired,
  loadTickets: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  removeTicket: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
  'GET_TICKETS',
  'GET_SPRINTS',
  'GET_PROJECTS',
]);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  tickets: state.tickets,
  sprints: state.sprints,
  projects: state.projects,
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadTickets,
  editTicket,
  loadSprints,
  loadProjects,
  loadUsers,
  removeTicket,
})(withRouter(EditTicketFormContainer));
