import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { loadProjects, selectProject } from '../actions/projects';
import { loadTickets } from '../actions/tickets';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const Timeline = ({
  isLoading,
  projects: { project },
  tickets: { tickets },
  loadTickets,
  selectProject,
}) => {
  const { projectid } = useParams();
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setSkip(true);
    selectProject(projectid);
    loadTickets(projectid, 'project');
  }, []);

  return (
    !isLoading &&
    skip && (
      <div>
        <h1>Timeline</h1>
        <div>
          {<h3>{project.name}</h3>}
          <p>Tickets:</p>
          {tickets.map((ticket) => (
            <p>{ticket.name}</p>
          ))}
        </div>
      </div>
    )
  );
};

// Timeline.propTypes = {
//   projects: PropTypes.object.isRequired,
//   loadProjects: PropTypes.func.isRequired,
// };

const loadingSelector = createLoadingSelector([
  'GET_TICKETS',
  'SELECT_PROJECT',
]);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
  tickets: state.tickets,
});

export default connect(mapStateToProps, {
  loadTickets,
  selectProject,
})(Timeline);
