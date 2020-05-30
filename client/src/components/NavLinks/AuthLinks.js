import React from 'react';
import { NavItem, NavLink, Nav } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const AuthLinks = ({ auth, logout }) => {
  return (
    <Nav className='border-0 flex-column flex-lg-row header-navbar'>
      <NavItem>
        <NavLink onClick={logout} to='#!' className='text-nowrap py-4'>
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  );
};

AuthLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(AuthLinks);
