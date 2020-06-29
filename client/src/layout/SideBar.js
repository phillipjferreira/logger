import React from 'react';
import { Col, Nav, Button } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import {
  openSidebar,
  closeSidebar,
  selectSidebarProject,
} from '../actions/menus';
// import { selectSidebarProject } from '../actions/projects';
import classNames from 'classnames';
import ProjectCard from '../components/sidebar/ProjectCard';
import ProjectDetails from '../components/sidebar/ProjectDetails';

const SideBar = ({
  auth: { user },
  menus: { sidebar, project },
  projects: { projects },
  selectSidebarProject,
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

  const { projectid } = useParams();
  if (projectid) {
    selectSidebarProject(projectid);
  }

  return (
    <Col tag='aside' className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <div className='nav-wrapper no-overflow'>
        <div className='sticky-top py-2 sidebar-bg'>
          {/* New/Edit Button */}
          {user.role >= 3 &&
            (project.name ? (
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
            ))}

          {/* Close Sidebar Button */}
          <Button
            onClick={closeSidebar}
            className={user.role < 3 && 'sidebar-padding'}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </Button>
        </div>
        <div>
          <Nav className='flex-column'>
            {project.name ? (
              <ProjectDetails project={project} closeSidebar={closeSidebar} />
            ) : (
              projects.map((p) => (
                <ProjectCard
                  key={p._id}
                  project={p}
                  onClick={selectSidebarProject}
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
  selectSidebarProject: PropTypes.func.isRequired,
  openSidebar: PropTypes.func.isRequired,
  closeSidebar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menus: state.menus,
  projects: state.projects,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  selectSidebarProject,
  openSidebar,
  closeSidebar,
})(SideBar);
