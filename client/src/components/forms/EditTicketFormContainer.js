import React, { useEffect, useReducer, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import EditTicketForm from './EditTicketForm';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../../Selectors';
import { loadProjects } from '../../actions/projects';
import { loadSprints } from '../../actions/sprints';
import { loadTickets, editTicket } from '../../actions/tickets';

const EditTicketFormContainer = ({
  tickets: { tickets },
  sprints: { sprints },
  projects: { projects },
  loadTickets,
  loadSprints,
  loadProjects,
  editTicket,
  history,
  isLoading,
}) => {
  const { ticketid } = useParams();
  const { projectid } = useParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    loadTickets(ticketid);
    loadProjects();
    loadSprints(projectid);
  }, []);

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

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      dispatch({ field: 'name', value: tickets.name });
      dispatch({ field: 'key', value: tickets.key });
      dispatch({ field: 'project', value: tickets.project });
      dispatch({ field: 'sprint', value: tickets.sprint });
      dispatch({ field: 'id', value: tickets._id });
    }
  }, [tickets]);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTicket(state, history);
  };

  return (
    !isLoading && (
      <EditTicketForm
        initialState={state}
        sprints={sprints}
        projects={projects}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    )
  );
};

EditTicketFormContainer.propTypes = {
  tickets: PropTypes.object.isRequired,
  loadTickets: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
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
});

export default connect(mapStateToProps, {
  loadTickets,
  editTicket,
  loadSprints,
  loadProjects,
})(withRouter(EditTicketFormContainer));
