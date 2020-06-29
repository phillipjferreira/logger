import React from 'react';
import { Container, Button, ButtonGroup } from 'shards-react';
import { NavLink } from 'react-router-dom';

function Landing() {
  return (
    <Container fluid className='main-content-container px-4 pb-4'>
      <div className='landing-container'>
        <div className='landing-content'>
          {/* <img src={require('../images/logger_logo.svg')} alt='Logger' /> */}
          <h1>Logger</h1>
          <h4>Track projects, one ticket at a time</h4>
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
