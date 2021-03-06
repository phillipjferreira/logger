import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import UserInfo from '../components/navbar/UserInfo';
import { createLoadingSelector } from '../Selectors';
import { Row, Col, Container, Card, CardBody, CardHeader } from 'shards-react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { loadUsers, updateUser } from '../actions/users';

const Users = ({
  users: { users },
  auth,
  loadUsers,
  updateUser,
  isLoading,
}) => {
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return !isLoading ? (
    <Container fluid className='main-content-container px-4'>
      {/* Page Header */}
      <Row noGutters className='page-header py-4'>
        <Col sm='12' className='text-center, text-md-left, mb-sm-0'>
          <span className='text-uppercase page-subtitle'>Users</span>
          <h3 className='page-title'>
            User: {auth.user.name}, Role: {auth.user.role}
          </h3>
        </Col>
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col sm='12'>
          <Card small className='mb-4'>
            <CardHeader className='border-bottom'>
              <h6 className='m-0'>Active Users</h6>
            </CardHeader>
            <CardBody className='p-0 pb-3'>
              <table className='table mb-0 width-100'>
                <thead className='bg-light'>
                  <tr>
                    <th scope='col' className='border-0'>
                      Name
                    </th>
                    <th scope='col' className='border-0'>
                      Email
                    </th>
                    <th scope='col' className='border-0'>
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <UserInfo
                      key={user._id}
                      user={user}
                      authUser={auth.user}
                      update={updateUser}
                    />
                  ))}
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <Container fluid className='main-content-container px-4'>
      {/* Page Header */}
      <Row noGutters className='page-header py-4'>
        <Col sm='12' className='text-center, text-md-left, mb-sm-0'>
          <span className='text-uppercase page-subtitle'>Users</span>
          <h3 className='page-title'>
            User: {auth.user.name}, Role: {auth.user.role}
          </h3>
        </Col>
      </Row>

      {/* Default Light Table */}
      <Row>
        <Col sm='12'>
          <Card small className='mb-4 vh-30'>
            <CardHeader className='border-bottom'>
              <h6 className='m-0'>Active Users</h6>
            </CardHeader>

            <Loader
              type='Oval'
              color='#007bff'
              height={50}
              width={50}
              className='center-short'
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Users.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const loadingSelector = createLoadingSelector(['GET_USERS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  users: state.users,
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUsers, updateUser })(Users);
