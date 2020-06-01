import React from 'react';
import { NavItem, NavLink } from 'shards-react';

const ProjectDetails = ({ project }) => {
  return (
    <NavItem>
      <NavLink>{project.name}</NavLink>
    </NavItem>
  );
};

export default ProjectDetails;
