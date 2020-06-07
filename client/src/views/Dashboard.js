import React from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import PropTypes from 'prop-types';

const Dashboard = ({ auth: { user }, loading }) => {
  return loading ? (
    <h1>LOADING...</h1>
  ) : (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h3>{user.name}</h3>
        <h3>{user.email}</h3>
        <h3>{user.role}</h3>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
