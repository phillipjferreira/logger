import React, { Fragment } from 'react';
import { NavItem, NavLink } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const ProjectDetails = ({ project, closeSidebar }) => {
  return (
    <Fragment>
      <NavItem className='no-hover'>
        <h6 className='main-sidebar__nav-title'>{project.name}</h6>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/projects/${project._id}/ticket-log`}
          className='py-4'
          onClick={
            useMediaQuery({ query: '(max-width:767px)' }) ? closeSidebar : null
          }
        >
          Ticket Log
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/projects/${project._id}/board`}
          className='py-4'
          onClick={
            useMediaQuery({ query: '(max-width:767px)' }) ? closeSidebar : null
          }
        >
          Sprint Board
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/projects/${project._id}/metrics`}
          className='py-4'
          onClick={
            useMediaQuery({ query: '(max-width:767px)' }) ? closeSidebar : null
          }
        >
          {'Charts & Metrics'}
        </NavLink>
      </NavItem>
    </Fragment>
  );
};

export default ProjectDetails;
