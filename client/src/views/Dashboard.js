import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'shards-react';
import { loadTickets } from '../actions/tickets';
import PieChartContainer from '../components/gadgets/PieChartContainer';
import AssignedTicketsContainer from '../components/gadgets/AssignedTicketsContainer';
import ActiveSprintsContainer from '../components/gadgets/ActiveSprintsContainer';
import PropTypes from 'prop-types';
import { loadProjects } from '../actions/projects';
import { loadUsers } from '../actions/users';
import { loadSprints } from '../actions/sprints';

const Dashboard = ({
  auth: { user },
  loadTickets,
  loadProjects,
  loadUsers,
  loadSprints,
}) => {
  useEffect(() => {
    loadTickets();
    loadProjects();
    loadUsers();
    loadSprints();
  }, []);
  return (
    <div>
      <div>
        <Container
          fluid
          className='main-content-container px-4 dashboard-container'
        >
          {/* Page Header */}
          <Row noGutters className='page-header py-4'>
            <Col sm='12' className='text-center, text-md-left, mb-sm-0'>
              <span className='text-uppercase page-subtitle'>Dashboard</span>
              <h3 className='page-title'>Welcome, {user.name}</h3>
            </Col>
          </Row>
          <Row className='pt-4'>
            <Col sm='12' lg='6'>
              <div className='dashboard-left pb-4'>
                <PieChartContainer />
              </div>
              <div className='dashboard-left pb-4'>
                <ActiveSprintsContainer />
              </div>
            </Col>
            <Col sm='12' lg='6' className='dashboard-right pb-4'>
              <AssignedTicketsContainer />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  loadTickets,
  loadProjects,
  loadUsers,
  loadSprints,
})(Dashboard);
