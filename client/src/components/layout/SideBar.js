import React, { useState } from 'react';
import { Col, Navbar, Nav } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSidebar } from '../../actions/menus';
import classNames from 'classnames';
import ProjectCard from '../sidebar/ProjectCard';
import ProjectDetails from '../sidebar/ProjectDetails';

const SideBar = ({
  menus: { sidebar },
  toggleSidebar,
  projects: { projects },
}) => {
  const [selectedProject, setSelectedProject] = useState(null);

  const classes = classNames(
    'main-sidebar',
    'px-0',
    'col-12',
    'pt-2',
    sidebar && 'open'
  );

  const handleClick = (id) => {
    setSelectedProject(projects.find((project) => project._id === id));
    console.log('here');
  };

  return (
    <Col tag='aside' className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <Navbar
        className='align-items-stretch bg-white border-bottom p-0'
        type='light'>
        <Nav>
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            projects.map((project) => (
              <ProjectCard project={project} onClick={handleClick} />
            ))
          )}
        </Nav>
      </Navbar>
    </Col>
  );
};

SideBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menus: state.menus,
  projects: state.projects,
});

export default connect(mapStateToProps, { toggleSidebar })(SideBar);
