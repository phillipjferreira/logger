import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import PropTypes from 'prop-types';

const Dashboard = ({ loadUser, auth }) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {auth.user && (
        <div>
          <h3>{auth.user.name}</h3>
          <h3>{auth.user.email}</h3>
          <h3>{auth.user.role}</h3>
        </div>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
