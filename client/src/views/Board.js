import React, { useEffect } from 'react';
import ControlledBoard from '../components/gadgets/ControlledBoard';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import { useParams } from 'react-router';
import { selectProject } from '../actions/projects';
import { Row, Col, Container } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Board = ({ projects: { project }, selectProject, isLoading }) => {
  let { projectid } = useParams();

  useEffect(() => {
    selectProject(projectid);
  }, [selectProject]);

  return (
    !isLoading && (
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
            <ControlledBoard />
          </Col>
        </Row>
      </Container>
    )
  );
};

Board.propTypes = {
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

const loadingSelector = createLoadingSelector([
  'GET_TICKETS',
  'SELECT_PROJECT',
]);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  projects: state.projects,
});

export default connect(mapStateToProps, { selectProject })(Board);
