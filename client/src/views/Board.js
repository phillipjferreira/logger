import React, { useEffect, useState, Fragment } from 'react';
import ControlledBoard from '../components/gadgets/ControlledBoard';
import { withRouter } from 'react-router-dom';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { loadSprints, editSprint } from '../actions/sprints';
import { loadTicket, loadTickets, editTicket } from '../actions/tickets';
import { Row, Col, Container, Button } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ViewTicket from '../components/modals/ViewTicket';

const Board = ({
  sprints: { sprints },
  tickets: { tickets, ticket, loading },
  loadTicket,
  loadTickets,
  loadSprints,
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
          <Row noGutters className='page-header py-4'>
            <Col xs='12' sm='4' className='text-center, text-md-left, mb-sm-0'>
              <span className='text-uppercase page-subtitle'>Sprint Board</span>
              <h3 className='page-title'>
                {activeSprint && activeSprint.name}
              </h3>
            </Col>
          </Row>
          {activeSprint && (
            <Fragment>
              <Row>
                <Col sm='6' md='4'>
                  <h5 className='card-title'>
                    Start Date: {activeSprint.startDate || 'N/A'}
                  </h5>
                </Col>
                <Col sm='6' md='4'>
                  <h5 className='card-title'>
                    End Date: {activeSprint.endDate || 'N/A'}
                  </h5>
                </Col>
                <Col sm='6' md='4'>
                  <Button className='btn-success' onClick={submit}>
                    Complete Sprint
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm='12'>
                  <p className='card-text text-muted'>
                    Goal: {activeSprint.goal || 'N/A'}
                  </p>
                </Col>
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
  tickets: PropTypes.object.isRequired,
  sprints: PropTypes.object.isRequired,
  loadTicket: PropTypes.func.isRequired,
  loadTickets: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  editTicket: PropTypes.func.isRequired,
  editSprint: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector(['GET_TICKETS', 'GET_SPRINTS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  tickets: state.tickets,
  sprints: state.sprints,
});

export default connect(mapStateToProps, {
  loadTicket,
  loadTickets,
  loadSprints,
  editTicket,
  editSprint,
})(withRouter(Board));
