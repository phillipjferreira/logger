import React from 'react';
import { NavItem, NavLink } from 'shards-react';

const ProjectDetails = ({ project }) => {
  return (
    <NavItem>
      <NavLink className='py-4'>{project.name}</NavLink>
    </NavItem>
  );
};

export default ProjectDetails;
