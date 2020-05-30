import React from 'react';
import {
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput,
} from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleSidebar } from '../../actions/menus';

const AuthLinks = ({ menus: { sidebar }, toggleSidebar, auth, logout }) => {
  return (
    <div>
      <Nav fill className='border-0 flex-column flex-lg-row header-navbar'>
        <NavItem>
          <NavLink onClick={toggleSidebar} className='text-nowrap py-4'>
            Projects
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={RouteNavLink}
            to='/dashboard'
            className='text-nowrap py-4'>
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={RouteNavLink} to='/users' className='text-nowrap py-4'>
            Users
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={RouteNavLink}
            to='/make-ticket'
            className='text-nowrap py-4'>
            Make Ticket
          </NavLink>
        </NavItem>
        <form className='main-navbar__search w-40 d-none d-md-flex d-lg-flex'>
          <div className='ml-3 input-group input-group-seamless'>
            <div className='input-group-prepend'>
              <span className='input-group-text'>
                <FontAwesomeIcon icon={faSearch} />
              </span>
            </div>
            <input
              placeholder='Search for something...'
              className='navbar-search form-control'
            />
          </div>
        </form>
        <NavItem>
          <NavLink onClick={logout} to='#!' className='text-nowrap py-4'>
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
};

AuthLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  menus: state.menus,
});

export default connect(mapStateToProps, { logout, toggleSidebar })(AuthLinks);
