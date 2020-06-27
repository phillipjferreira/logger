import React, { useState } from 'react';
import { NavItem, NavLink, Nav } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const GuestLinks = ({ collapse }) => {
  return (
    <Nav
      navbar
      className='border-0 flex-column flex-md-row header-navbar right'
    >
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/demo-login'
          className='text-nowrap py-4'
          onClick={collapse}
        >
          Demo User
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/register'
          className='text-nowrap py-4'
          onClick={collapse}
        >
          Register
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={RouteNavLink}
          to='/login'
          className='text-nowrap py-4'
          onClick={collapse}
        >
          Login
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default GuestLinks;
