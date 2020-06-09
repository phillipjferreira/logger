import React, { useEffect, useState, Fragment } from 'react';
import ControlledBoard from '../components/gadgets/ControlledBoard';
import { withRouter } from 'react-router-dom';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { loadSprints, editSprint } from '../actions/sprints';
import { loadTicket, loadTickets, editTicket } from '../actions/tickets';
import { Row, Col, Container, Button } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewTicket from '../components/modals/ViewTicket';

const Board = ({
  projects: { project },
  sprints: { sprints },
  tickets: { tickets, ticket, loading },
  loadTicket,
  loadTickets,
  loadSprints,
  selectProject,
  editTicket,
  editSprint,
  isLoading,
  history,
}) => {
  const { projectid } = useParams();
  const [skip, setSkip] = useState(false);
  const [show, setShow] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSprint, setActiveSprint] = useState(null);

  useEffect(() => {
    setSkip(true);
    selectProject(projectid);
    loadSprints(projectid);
  }, []);

  useEffect(() => {
    if (skip && sprints) {
      setActiveSprint(sprints.find((sprint) => sprint.status === 'Active'));
    }
  }, [sprints]);

  useEffect(() => {
    if (skip && sprints) {
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
  }, [activeSprint]);

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

  const submit = () => {
    let output = activeSprint;
    output.status = 'Complete';
    output.id = output._id;
    delete output._id;
    editSprint(output, history);
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
        <Container fluid className='main-content-container px-4'>
          <Row noGutters className='page-header pt-4'>
            <Col xs='12' sm='4' className='text-center, text-md-left, mb-sm-0'>
              <span className='text-uppercase page-subtitle'>
                {activeSprint && project.name + ' - ' + activeSprint.name}
              </span>
              <h2>Sprint Board</h2>
            </Col>
          </Row>
          <hr />
          {activeSprint && (
            <Fragment>
              <Row className='pt-4 px-4 tab-title'>
                <p className='card-title'>
                  Start Date: {activeSprint.startDate || 'N/A'}
                </p>

                <p className='card-title'>
                  End Date: {activeSprint.endDate || 'N/A'}
                </p>

                <p>
                  <Button className='btn-success' onClick={submit}>
                    Complete Sprint
                  </Button>
                </p>
              </Row>
              <Row className='px-4'>
                <p className='card-text text-muted'>
                  Goal: {activeSprint.goal || 'N/A'}
                </p>
              </Row>
            </Fragment>
          )}

          <Row>
            <Col lg='12' className='mx-auto mt-4'>
              {activeSprint ? (
                <ControlledBoard
                  onCardDragEnd={onDrag}
                  tickets={tickets}
                  view={viewTicket}
                />
              ) : (
                <p>{message}</p>
              )}
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  );
};

Board.propTypes = {
  projects: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired,
  sprints: PropTypes.object.isRequired,
  selectProject: PropTypes.func.isRequired,
  loadTicket: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
  editSprint: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector(['GET_TICKETS', 'GET_SPRINTS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
  tickets: state.tickets,
  sprints: state.sprints,
});

export default connect(mapStateToProps, {
  selectProject,
  loadTicket,
  loadTickets,
  loadSprints,
  editTicket,
  editSprint,
})(withRouter(Board));
