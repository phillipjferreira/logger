import React, { Fragment } from 'react';
import { Link, Redirect, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import {
  faUserCog,
  faUserEdit,
  faUser,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, CardBody } from 'shards-react';

const DemoLogin = ({ login, isAuthenticated }) => {
  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container fluid className='main-content-container h-100 px-4 py-5'>
        <Row noGutters className='h-100'>
          <Col lg='3' md='5' className='auth-form mx-auto my-auto'>
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className='auth-form__logo d-table mx-auto mb-3'
                  src={require('../images/shards-dashboards-logo.svg')}
                  alt='Shards Dashboards - Login Template'
                />

                {/* Title */}
                <h5 className='auth-form__title text-center mb-4'>
                  Choose a Demo Account
                </h5>

                {/* Form Fields */}
                <Row className='mb-4'>
                  <Col>
                    <Link tag={NavLink} to={`/login`}>
                      <div className='box text-center'>
                        <span>
                          <FontAwesomeIcon
                            icon={faUserCog}
                            size='3x'
                            color='#007bff'
                          />
                          <h6>Admin</h6>
                        </span>
                      </div>
                    </Link>
                  </Col>
                  <Col>
                    <Link tag={NavLink} to={`/login`}>
                      <div className='box text-center'>
                        <span>
                          <FontAwesomeIcon
                            icon={faUserEdit}
                            size='3x'
                            color='#007bff'
                          />
                          <h6>Dev</h6>
                        </span>
                      </div>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Link tag={NavLink} to={`/login`}>
                      <div className='box text-center'>
                        <span>
                          <FontAwesomeIcon
                            icon={faUser}
                            size='3x'
                            color='#007bff'
                          />
                          <h6>User</h6>
                        </span>
                      </div>
                    </Link>
                  </Col>

                  <Col>
                    <Link tag={NavLink} to={`/login`}>
                      <div className='box text-center'>
                        <span>
                          <FontAwesomeIcon
                            icon={faEye}
                            size='3x'
                            color='#007bff'
                          />
                          <h6>Read-Only</h6>
                        </span>
                      </div>
                    </Link>
                  </Col>
                </Row>
              </CardBody>
            </Card>

            {/* Meta Details */}
            <div className='auth-form__meta d-flex mt-4'>
              <Link to='/forgot-password'>Login</Link>
              <Link to='/register' className='ml-auto'>
                Create an account
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

DemoLogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(DemoLogin);
