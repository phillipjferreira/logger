import React from 'react';
import { Col, Nav, Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { openSidebar, closeSidebar } from '../actions/menus';
import { selectProject } from '../actions/projects';
import classNames from 'classnames';
import ProjectCard from '../components/sidebar/ProjectCard';
import ProjectDetails from '../components/sidebar/ProjectDetails';

const SideBar = ({
  menus: { sidebar },
  projects: { projects, project },
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

  const buttonOnClick = useMediaQuery({ query: '(max-width:767px)' })
    ? closeSidebar
    : null;

  return (
    <Col tag='aside' className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <div className='nav-wrapper no-overflow'>
        <div className='sticky-top py-2 bg-gray'>
          {/* New/Edit Button */}
          {project.name ? (
            <Button
              tag={RouteNavLink}
              to={`/projects/${project._id}/edit-project/`}
              className='edit-project btn-success'
              onClick={buttonOnClick}
            >
              + Edit Project
            </Button>
          ) : (
            <Button
              tag={RouteNavLink}
              to='/new-project'
              className='edit-project btn-success'
              onClick={buttonOnClick}
            >
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
            {project.name ? (
              <ProjectDetails project={project} closeSidebar={closeSidebar} />
            ) : (
              projects.map((p) => (
                <ProjectCard key={p._id} project={p} onClick={selectProject} />
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
