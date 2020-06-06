import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../actions/auth';
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from '../Selectors';
import PropTypes from 'prop-types';

const Dashboard = ({ auth: { user }, isLoading }) => {
  return isLoading ? (
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

const loadingSelector = createLoadingSelector(['LOAD_USER']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
