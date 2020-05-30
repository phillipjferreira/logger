import React from 'react';
import { Container, Button, ButtonGroup } from 'shards-react';
import { NavLink } from 'react-router-dom';

function Landing() {
  return (
    <Container fluid className='main-content-container px-4 pb-4'>
      <div className='landing-container'>
        <div className='landing-content'>
          <h1>BugTracker</h1>
          <h4>Find the bugs, kill the bugs</h4>
          <ButtonGroup size='sm' className='d-inline-flex mb-3 mb-sm-0 mx-auto'>
            <Button tag={NavLink} to='/register'>
              Register
            </Button>
            <Button outline tag={NavLink} to='/login'>
              Login
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </Container>
  );
}

export default Landing;
