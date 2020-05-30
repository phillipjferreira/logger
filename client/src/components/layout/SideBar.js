import React, { Fragment } from 'react';
import { Col } from 'shards-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSidebar } from '../../actions/menus';
import classNames from 'classnames';

const SideBar = ({ menus: { sidebar }, toggleSidebar }) => {
  const classes = classNames(
    'main-sidebar',
    'px-0',
    'col-12',
    sidebar && 'open'
  );

  return (
    <Col tag='aside' className={classes} lg={{ size: 2 }} md={{ size: 3 }}>
      <h1>Line 1</h1>
      <h2>Line 2</h2>
      <h2>{sidebar}</h2>
      <button onClick={toggleSidebar}></button>
    </Col>
  );
};

SideBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  menus: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  menus: state.menus,
});

export default connect(mapStateToProps, { toggleSidebar })(SideBar);
