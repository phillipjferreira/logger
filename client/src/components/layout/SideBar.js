import React from 'react';
import { Col, Nav, Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  closeSidebar,
}) => {
  const classes = classNames(
    'main-sidebar',
    'px-0',
    'col-12',
    'pt-0',
    sidebar && 'open'
  );

  return (
    <Col tag='aside' className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <div className='nav-wrapper no-overflow'>
        <div className='sticky-top py-2 bg-gray'>
          {/* New/Edit Button */}
          {selectedProject ? (
            <Button
              tag={RouteNavLink}
              to={`/projects/${selectedProject.key}/edit-project/`}
              className='edit-project btn-success'>
              + Edit Project
            </Button>
          ) : (
            <Button
              tag={RouteNavLink}
              to='/new-project'
              className='edit-project btn-success'>
              + New Project
            </Button>
          )}

          {/* Close Sidebar Button */}
          <Button onClick={closeSidebar}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
        </div>
        <div>
          <Nav className='flex-column'>
            {selectedProject ? (
              <ProjectDetails project={selectedProject} />
            ) : (
              projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                  onClick={selectProject}
                />
              ))
            )}
          </Nav>
        </div>
      </div>
    </Col>
  );
};

SideBar.propTypes = {
  menus: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  selectProject: PropTypes.func.isRequired,
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
