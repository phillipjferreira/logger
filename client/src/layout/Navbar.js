import React, { Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Navbar as ShardNav,
} from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <Nav tabs className='border-0 flex-column flex-lg-row'>
      <NavItem>
        <NavLink tag={RouteNavLink} to='/' className='text-nowrap'>
          HOME
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink onClick={logout} to='#!' className='text-nowrap'>
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  );
  const guestLinks = (
    <Nav tabs className='border-0 flex-column flex-lg-row'>
      <NavItem>
        <NavLink tag={RouteNavLink} to='/' className='text-nowrap'>
          HOME
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouteNavLink} to='/register' className='text-nowrap'>
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={RouteNavLink} to='/login' className='text-nowrap'>
          Login
        </NavLink>
      </NavItem>
    </Nav>
  );

  return (
    <ShardNav className='header-navbar d-lg-flex p-0 bg-white border-top'>
      <Container>
        <Row>
          <Col>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </Col>
        </Row>
      </Container>
    </ShardNav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
