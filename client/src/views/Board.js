import React, { useEffect, useState } from 'react';
import ControlledBoard from '../components/gadgets/ControlledBoard';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadTickets, editTicket } from '../actions/tickets';
import { Row, Col, Container } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Board = ({
  projects: { project },
  tickets: { tickets },
  selectProject,
  loadTickets,
  editTicket,
  isLoading,
}) => {
  const { projectid } = useParams();
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    setSkip(true);
    loadTickets(projectid, 'project');
    selectProject(projectid);
  }, []);

  const onDrag = (card, source, destination) => {
    if (source.fromColumnId != destination.toColumnId) {
      editTicket({
        id: card.id,
        status: ['To-Do', 'In-Progress', 'Done'][destination.toColumnId],
      });
    }
  };

  const viewTicket = (id) => {
    console.log(tickets.filter((ticket) => ticket._id === id));
  };

  return (
    !isLoading &&
    skip && (
      <Container fluid className='main-content-container px-4'>
        <Row>
          <Col lg='12' className='mx-auto mt-4'>
            <h1>Sprint Board</h1>
            <h3>{projectid}</h3>
            <h5>{project.name}</h5>
          </Col>
        </Row>
        <Row>
          <Col lg='12' className='mx-auto mt-4'>
            <ControlledBoard
              onCardDragEnd={onDrag}
              tickets={tickets}
              view={viewTicket}
            />
          </Col>
        </Row>
      </Container>
    )
  );
};

Board.propTypes = {
  projects: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired,
  loadTickets: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
  'GET_TICKETS',
  'SELECT_PROJECT',
]);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  tickets: state.tickets,
  projects: state.projects,
});

export default connect(mapStateToProps, {
  selectProject,
  loadTickets,
  editTicket,
})(Board);
