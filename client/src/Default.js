import React, { Fragment } from 'react';
import MainNavbar from './layout/MainNavbar';
import SideBar from './layout/SideBar';
import { openSidebar } from './actions/menus';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Button } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Default = ({
  children,
  menus: { sidebar },
  auth: { isAuthenticated },
  openSidebar,
}) => {
  return (
    <Fragment>
      <MainNavbar />
      {isAuthenticated && (
        <Fragment>
          <SideBar />
          {!sidebar && (
            <Button onClick={openSidebar} className='sidebar-right'>
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          )}
        </Fragment>
      )}
      <Col
        className='main-content p-0'
        lg={sidebar && { size: 10, offset: 2 }}
        md={sidebar && { size: 9, offset: 3 }}
        sm='12'
        tag='main'>
        {children}
      </Col>
    </Fragment>
  );
};

Default.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  openSidebar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  menus: state.menus,
  auth: state.auth,
});

export default connect(mapStateToProps, { openSidebar })(Default);
