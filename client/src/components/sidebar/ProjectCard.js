import React from 'react';
import { NavItem, NavLink } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const ProjectCard = ({ project, onClick }) => {
  return (
    <NavItem>
      <NavLink
        tag={RouteNavLink}
        to={`/${project.name}`}
        onClick={() => onClick(project._id)}
        className='text-nowrap py-4'>
        {project.name}
        {project.key}
      </NavLink>
    </NavItem>
  );
};

export default ProjectCard;
