import React from 'react';
import { NavItem, NavLink, Nav } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { openSidebar } from '../../actions/menus';
import { loadProjects, selectProject } from '../../actions/projects';
import { useMediaQuery } from 'react-responsive';

const AuthLinks = ({
  openSidebar,
  logout,
  loadProjects,
  selectProject,
  collapse,
}) => {
  const projectClick = () => {
    loadProjects();
    openSidebar();
    selectProject(null);
  };

  return (
    <Nav
      navbar
      className='border-0 flex-column flex-md-row header-navbar w-100'
    >
      <NavItem>
        <NavLink
          onClick={
            useMediaQuery({ query: '(max-width:767px)' })
              ? collapse + projectClick
              : projectClick
          }
          className='text-nowrap py-4'
        >
          Projects
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/dashboard'
          className='text-nowrap py-4'
          onClick={
            useMediaQuery({ query: '(max-width:767px)' }) ? collapse : null
          }
        >
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/users'
          className='text-nowrap py-4'
          onClick={
            useMediaQuery({ query: '(max-width:767px)' }) ? collapse : null
          }
        >
          Users
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/make-ticket'
          className='text-nowrap py-4'
          onClick={
            useMediaQuery({ query: '(max-width:767px)' }) ? collapse : null
          }
        >
          Make Ticket
        </NavLink>
      </NavItem>
      <NavItem className='right'>
        <NavLink
          onClick={
            useMediaQuery({ query: '(max-width:767px)' })
              ? collapse + logout
              : logout
          }
          to='#!'
          className='text-nowrap py-4'
        >
          Logout
        </NavLink>
      </NavItem>
    </Nav>
  );
};

AuthLinks.propTypes = {
  logout: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  loadProjects: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
};

export default connect(null, {
  logout,
  openSidebar,
  loadProjects,
  selectProject,
})(AuthLinks);
