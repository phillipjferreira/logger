import React, { useEffect, useState, Fragment } from 'react';
import ControlledBoard from '../components/gadgets/ControlledBoard';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints } from '../actions/sprints';
import { loadTicket, loadTickets, editTicket } from '../actions/tickets';
import { Row, Col, Container } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewTicket from '../components/modals/ViewTicket';

const Board = ({
  projects: { project },
  sprints: { sprints },
  tickets: { tickets, ticket, loading },
  selectProject,
  loadTicket,
  loadTickets,
  loadSprints,
  editTicket,
  isLoading,
}) => {
  const { projectid } = useParams();
  const [skip, setSkip] = useState(false);
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setSkip(true);
    selectProject(projectid);
    loadSprints(projectid);
  }, []);

  useEffect(() => {
    if (skip && sprints) {
      const activeSprint = sprints.find((sprint) => sprint.status === 'Active');
      if (sprints.length === 0) {
        setMessage(
          'No Sprints yet! Plan and Activate a Sprint in the Ticket Log to get started!'
        );
      } else if (!activeSprint) {
        setMessage(
          'No active Sprint! Activate a Sprint in the Ticket Log to get started!'
        );
      } else {
        loadTickets(activeSprint._id, 'sprint');
      }
      setShow(true);
    }
  }, [sprints]);

  const onDrag = (card, source, destination) => {
    if (source.fromColumnId != destination.toColumnId) {
      editTicket({
        id: card.id,
        status: ['To-Do', 'In-Progress', 'Done'][destination.toColumnId],
      });
    }
  };

  const toggle = () => {
    setModalOpen(!modalOpen);
  };

  const viewTicket = (id) => {
    loadTicket(id);
    toggle();
  };

  return (
    skip &&
    !isLoading &&
    show && (
      <Fragment>
        <ViewTicket
          ticket={ticket}
          isLoading={loading}
          toggle={toggle}
          open={modalOpen}
        />
        <Container fluid className="main-content-container px-4">
          <Row>
            <Col lg="12" className="mx-auto mt-4">
              <h1>Sprint Board</h1>
              <h4>{!message && sprints.name}</h4>
            </Col>
          </Row>
          {!message ? (
            <Row>
              <Col lg="12" className="mx-auto mt-4">
                <ControlledBoard
                  onCardDragEnd={onDrag}
                  tickets={tickets}
                  view={viewTicket}
                />
              </Col>
            </Row>
          ) : (
            <p>{message}</p>
          )}
        </Container>
      </Fragment>
    )
  );
};

Board.propTypes = {
  projects: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired,
  sprints: PropTypes.object.isRequired,
  loadTicket: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
  'GET_TICKETS',
  'SELECT_PROJECT',
]);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  tickets: state.tickets,
  projects: state.projects,
  sprints: state.sprints,
});

export default connect(mapStateToProps, {
  selectProject,
  loadTicket,
  loadTickets,
  loadSprints,
  editTicket,
})(Board);
