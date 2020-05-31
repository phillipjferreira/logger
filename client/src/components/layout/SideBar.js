import React from 'react';
import { Col, Navbar, Nav } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openSidebar, closeSidebar } from '../../actions/menus';
import { selectProject } from '../../actions/projects';
import classNames from 'classnames';
import ProjectCard from '../sidebar/ProjectCard';
import ProjectDetails from '../sidebar/ProjectDetails';

const SideBar = ({
  menus: { sidebar },
  projects: { projects, selectedProject },
  selectProject,
  openSidebar,
  closeSidebar,
}) => {
  const classes = classNames(
    'main-sidebar',
    'px-0',
    'col-12',
    'pt-2',
    sidebar && 'open'
  );

  return (
    <Col tag='aside' className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <button onClick={closeSidebar}>Close</button>
      <Navbar
        className='align-items-stretch bg-white border-bottom p-0'
        type='light'>
        <Nav>
          {selectedProject ? (
            <ProjectDetails project={selectedProject} />
          ) : (
            projects.map((project) => (
              <ProjectCard project={project} onClick={selectProject} />
            ))
          )}
        </Nav>
      </Navbar>
    </Col>
  );
};

SideBar.propTypes = {
  menus: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  selectProject: PropTypes.func.isRequired,
  selectedProject: PropTypes.object.isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menus: state.menus,
  projects: state.projects,
});

export default connect(mapStateToProps, {
  selectProject,
  openSidebar,
  closeSidebar,
})(SideBar);
