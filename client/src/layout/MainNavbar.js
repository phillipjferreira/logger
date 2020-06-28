import React, { useState } from 'react';
import {
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
} from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLinks from '../components/navlinks/AuthLinks';
import GuestLinks from '../components/navlinks/GuestLinks';

const MainNavbar = ({ auth: { isAuthenticated, loading } }) => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  return (
    <div className='bg-white sticky-top nav-height'>
      <Container className='p-0'>
        <Navbar
          type='light'
          className='align-items-stretch flex-md-nowrap p-0'
          expand='md'
        >
          <NavbarBrand
            tag={RouteNavLink}
            to='/'
            style={{ lineHeight: '25px', display: 'flex' }}
          >
            <div className='d-table m-auto'>
              <img
                id='main-logo'
                className='d-inline-block align-top mr-1 ml-3'
                style={{ maxWidth: '25px' }}
                src={require('../images/logger_logo.svg')}
                alt='Logger'
              />
              <span className='d-none d-md-inline ml-1'>Logger</span>
            </div>
          </NavbarBrand>
          <NavbarToggler onClick={() => setCollapseOpen(!collapseOpen)} />
          <Collapse open={collapseOpen} navbar>
            {!loading &&
              (isAuthenticated ? (
                <AuthLinks collapse={() => setCollapseOpen(!collapseOpen)} />
              ) : (
                <GuestLinks collapse={() => setCollapseOpen(!collapseOpen)} />
              ))}
          </Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

MainNavbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MainNavbar);
