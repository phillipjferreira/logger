import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { loadProjects } from '../actions/projects';
import { loadTickets } from '../actions/tickets';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const Timeline = ({
  isLoading,
  projects: { projects, projectsLoading },
  tickets: { tickets },
  loadProjects,
  loadTickets,
}) => {
  const { projectid } = useParams();

  useEffect(() => {
    loadProjects();
    loadTickets(projectid, 'project');
  }, [loadProjects, loadTickets, projectid]);

  return (
    <div>
      <h1>Timeline</h1>
      <div>
        <h3>{projectid}</h3>
        {!projectsLoading && (
          <p>{projects.find((project) => project._id === projectid).name}</p>
        )}
        {!isLoading && tickets.map((ticket) => <p>{ticket.name}</p>)}
      </div>
    </div>
  );
};
// {
//   !isloading && (
//     <div>
//       {projects.find((project) => project._id === projectid).name}
//       {tickets.map((ticket) => (
//         <p>{ticket.name}</p>
//       ))}
//     </div>
//   );
// }

// Timeline.propTypes = {
//   projects: PropTypes.object.isRequired,
//   loadProjects: PropTypes.func.isRequired,
// };

const loadingSelector = createLoadingSelector(['GET_TICKETS', 'GET_PROJECTS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
  tickets: state.tickets,
});

export default connect(mapStateToProps, { loadProjects, loadTickets })(
  Timeline
);
