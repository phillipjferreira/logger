import React from 'react';
import { NavItem, NavLink, Nav } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../actions/auth';
import { openSidebar } from '../../actions/menus';
import { loadProjects, selectProject } from '../../actions/projects';

const AuthLinks = ({
  menus: { sidebar },
  openSidebar,
  auth,
  logout,
  projects: { projects },
  loadProjects,
  selectProject,
}) => {
  const projectClick = () => {
    loadProjects();
    openSidebar();
    selectProject(null);
  };

  return (
    <div>
      <Nav fill className='border-0 flex-column flex-lg-row header-navbar'>
        <NavItem>
          <NavLink onClick={projectClick} className='text-nowrap py-4'>
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
  openSidebar: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
  loadProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  selectProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  menus: state.menus,
  projects: state.projects,
});

export default connect(mapStateToProps, {
  logout,
  openSidebar,
  loadProjects,
  selectProject,
})(AuthLinks);
