import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useParams } from 'react-router';
import EditTicketForm from './EditTicketForm';
import { loadProjects } from '../../actions/projects';
import { loadSprints } from '../../actions/sprints';
import { loadTickets, editTicket } from '../../actions/tickets';

const EditTicketFormContainer = ({
  tickets: { tickets, ticketsLoading },
  sprints: { sprints, sprintsLoading },
  projects: { projects, projectsLoading },
  loadTickets,
  loadSprints,
  loadProjects,
  editTicket,

  history,
}) => {
  let { ticketid } = useParams();

  useEffect(() => {
    loadTickets(ticketid);
    loadProjects();
  }, [loadTickets, ticketid, loadProjects]);

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
    if (!ticketsLoading && !Array.isArray(tickets)) {
      loadSprints(tickets.project);
      dispatch({ field: 'name', value: tickets.name });
      dispatch({ field: 'key', value: tickets.key });
      dispatch({ field: 'project', value: tickets.project });
      dispatch({ field: 'sprint', value: tickets.sprint });
      dispatch({ field: 'id', value: tickets._id });
    }
  }, [loadSprints, tickets, ticketsLoading]);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    editTicket(state, history);
  };

  return (
    // !ticketsLoading &&
    // !sprintsLoading &&
    // !projectsLoading &&
    // Array.isArray(projects) &&
    <EditTicketForm
      ticketsLoading={ticketsLoading}
      initialState={state}
      sprints={sprints}
      projects={projects}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

EditTicketFormContainer.propTypes = {
  tickets: PropTypes.object.isRequired,
  loadTickets: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
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
