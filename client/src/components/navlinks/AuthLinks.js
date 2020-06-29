import React from 'react';
import { NavItem, NavLink, Nav } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { openSidebar, selectSidebarProject } from '../../actions/menus';
import { useMediaQuery } from 'react-responsive';

const AuthLinks = ({
  auth: { user },
  openSidebar,
  logout,
  selectSidebarProject,
  collapse,
}) => {
  const projectClick = () => {
    openSidebar();
    selectSidebarProject(null);
  };
  const output = useMediaQuery({ query: '(max-width:767px)' });

  return (
    <Nav
      navbar
      className={
        'border-0 flex-column flex-md-row header-navbar w-100 ' +
        (useMediaQuery({ query: '(max-width:575px)' }) && 'pl-4')
      }
    >
      <NavItem>
        <NavLink
          onClick={
            output
              ? () => {
                  collapse();
                  projectClick();
                }
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
          onClick={output ? collapse : null}
        >
          Dashboard
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/users'
          className='text-nowrap py-4'
          onClick={output ? collapse : null}
        >
          Users
        </NavLink>
      </NavItem>
      {user.role >= 2 && (
        <NavItem>
          <NavLink
            tag={RouteNavLink}
            to='/make-ticket'
            className='text-nowrap py-4'
            onClick={output ? collapse : null}
          >
            Make Ticket
          </NavLink>
        </NavItem>
      )}
      <NavItem className='right'>
        <NavLink
          onClick={
            output
              ? () => {
                  collapse();
                  logout();
                }
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
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
  openSidebar,
  selectSidebarProject,
})(AuthLinks);
