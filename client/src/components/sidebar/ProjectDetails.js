import React from 'react';
import { NavItem, NavLink } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const ProjectDetails = ({ project }) => {
  return (
    <NavItem>
      <NavLink>{project.name}</NavLink>
    </NavItem>
  );
};

export default ProjectDetails;
