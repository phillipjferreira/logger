import React, { Fragment } from 'react';
import { Col, Navbar, Nav, NavItem, NavLink, Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
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
      {sidebar && (
        <Button onClick={closeSidebar} className='sidebar-left'>
          <FontAwesomeIcon icon={faAngleLeft} />
        </Button>
      )}
      {!sidebar && (
        <Button onClick={openSidebar} className='sidebar-right'>
          <FontAwesomeIcon icon={faAngleRight} />
        </Button>
      )}

      <Navbar
        className='align-items-stretch bg-white border-bottom p-0 space-above'
        type='light'>
        <Nav>
          {selectedProject ? (
            <Fragment>
              <ProjectDetails project={selectedProject} />
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={'edit-project'}
                  className='py-4'>
                  + Edit Project
                </NavLink>
              </NavItem>
            </Fragment>
          ) : (
            <Fragment>
              <NavItem>
                <NavLink
                  tag={RouteNavLink}
                  to={'edit-project'}
                  className='py-4'>
                  + New Project
                </NavLink>
              </NavItem>
              {projects.map((project) => (
                <ProjectCard project={project} onClick={selectProject} />
              ))}
            </Fragment>
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
