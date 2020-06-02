import React, { Fragment } from 'react';
import { NavItem, NavLink } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const ProjectDetails = ({ project }) => {
  return (
    <Fragment>
      <NavItem className='no-hover'>
        <h6 className='main-sidebar__nav-title'>{project.name}</h6>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/${project._id}/timeline`}
          className='py-4'>
          Timeline
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/${project._id}/ticket-log`}
          className='py-4'>
          Ticket Log
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/${project._id}/board`}
          className='py-4'>
          Sprint Board
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to={`/${project._id}/metrics`}
          className='py-4'>
          {'Charts & Metrics'}
        </NavLink>
      </NavItem>
    </Fragment>
  );
};

export default ProjectDetails;
