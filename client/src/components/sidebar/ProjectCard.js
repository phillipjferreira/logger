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
        className='py-4'>
        {project.name.length <= 20
          ? project.name
          : project.name.substr(0, 19).concat('...')}
      </NavLink>
    </NavItem>
  );
};

export default ProjectCard;
