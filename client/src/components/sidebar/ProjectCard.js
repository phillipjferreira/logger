import React from 'react';
import { NavItem, NavLink } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const ProjectCard = ({ project, onClick }) => {
  return (
    <NavItem>
      <NavLink
        tag={RouteNavLink}
        to={`/projects/${project._id}/board`}
        onClick={() => onClick(project._id)}
        className='py-4'
      >
        {project.name}
      </NavLink>
    </NavItem>
  );
};

export default ProjectCard;
