import React, { Fragment } from 'react';
import { Container, Navbar, NavbarBrand } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthLinks from '../NavLinks/AuthLinks';
import GuestLinks from '../NavLinks/GuestLinks';

// import NavbarSearch from "./NavbarSearch";
// import NavbarNav from "./NavbarNav/NavbarNav";
// import NavbarToggle from "./NavbarToggle";

const MainNavbar = ({ auth: { isAuthenticated, loading } }) => {
  return (
    <div className='main-navbar bg-white'>
      <Container className='p-0'>
        <Navbar type='light' className='align-items-stretch flex-md-nowrap p-0'>
          <NavbarBrand tag={RouteNavLink} to='/' style={{ lineHeight: '25px' }}>
            <div className='d-table m-auto'>
              <img
                id='main-logo'
                className='d-inline-block align-top mr-1 ml-3'
                style={{ maxWidth: '25px' }}
                src={require('../../images/shards-dashboards-logo.svg')}
                alt='Shards Dashboard'
              />
              <span className='d-none d-md-inline ml-1'>BugTracker</span>
            </div>
          </NavbarBrand>
          {!loading && (
            <Fragment>
              {isAuthenticated ? <AuthLinks /> : <GuestLinks />}
            </Fragment>
          )}
          {/* <NavbarSearch />
          <NavbarNav />
          <NavbarToggle /> */}
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
