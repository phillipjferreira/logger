import React, { Fragment } from 'react';
import MainNavbar from './components/layout/MainNavbar';
import SideBar from './components/layout/SideBar';
import { Col } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Default = ({
  children,
  menus: { sidebar },
  auth: { isAuthenticated },
}) => {
  return (
    <Fragment>
      <MainNavbar />
      {isAuthenticated && <SideBar />}
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

SideBar.propTypes = {
  menus: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menus: state.menus,
  auth: state.auth,
});

export default connect(mapStateToProps)(Default);
