import React, { useEffect } from 'react';
import ControlledBoard from '../components/gadgets/ControlledBoard';
import { useParams } from 'react-router';
import { loadProjects } from '../actions/projects';
import { Row, Col, Container } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Board = ({ projects: { projects, projectsLoading }, loadProjects }) => {
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  let { projectid } = useParams();

  return (
    <Container fluid className='main-content-container px-4'>
      <Row>
        <Col lg='12' className='mx-auto mt-4'>
          <h1>Sprint Board</h1>
          <h3>{projectid}</h3>
          {!projectsLoading && (
            <h5>
              {projects.find((project) => project._id === projectid).name}
            </h5>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg='12' className='mx-auto mt-4'>
          <ControlledBoard />
        </Col>
      </Row>
    </Container>
  );
};

Board.propTypes = {
  projects: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { loadProjects })(Board);
