import React from 'react';
import { Container, Button, Col, Row } from 'shards-react';
import { NavLink } from 'react-router-dom';
import {
  faHistory,
  faChartLine,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dashboard from '../images/landing/dashboard.png';

function Landing() {
  return (
    <Container fluid className='p-0 landing-container'>
      <Row className='h-100 mx-auto mb-4 title-content'>
        {/* Header and Call to Action */}
        <Col xs='12' md='6' className='m-auto px-4 landing-header'>
          <h1 className='mb-4'>The Ticket Solution for Every Software Team</h1>
          <h4 className='mb-4'>
            Organize your product backlogs and sprint cycles, all in one place.
          </h4>
          <Button
            pill
            size='lg'
            tag={NavLink}
            to='/demo-login'
            className='mb-4'
          >
            Try a Demo!
          </Button>
        </Col>
        {/* Logger Image */}
        <Col xs='12' md='6' className='mx-auto px-4'>
          <div class='featured-image'>
            <img src={dashboard} alt='Logger Dashboard' />
          </div>
        </Col>
      </Row>
      <Row className='h-100 features-content m-0'>
        {/* Feature 1 */}
        <Col xs='12' md='4' className='feature'>
          <FontAwesomeIcon
            icon={faHistory}
            size='3x'
            color='#3D5170'
            className=''
          />
          <h3>Track Ticket History</h3>
          <p>
            Logger keeps track of all changes made to tickets—check who made
            changes and when they were made.
          </p>
        </Col>
        {/* Feature 2 */}
        <Col xs='12' md='4' className='feature'>
          <FontAwesomeIcon
            icon={faChartLine}
            size='3x'
            color='#3D5170'
            className=''
          />
          <h3>View Sprint Progress</h3>
          <p>
            Use Story Points to estimate effort for each ticket and follow
            sprint progess in the sprint burndown chart.
          </p>
        </Col>
        {/* Feature 3 */}
        <Col xs='12' md='4' className='feature'>
          <FontAwesomeIcon
            icon={faUsers}
            size='3x'
            color='#3D5170'
            className=''
          />
          <h3>Assign Team Roles</h3>
          <p>
            Team members can be given roles of Admin, User, or View-Only. Use
            these roles to control app permissions!
          </p>
        </Col>
      </Row>
      <Row className='h-100 m-0'>
        <Col xs='12' className='small-only p-4 '>
          <Button pill size='lg' tag={NavLink} to='/demo-login'>
            Check out a Demo!
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
