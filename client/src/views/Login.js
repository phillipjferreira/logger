import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
} from 'shards-react';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container fluid className='main-content-container h-100 px-4 py-5'>
        <Row noGutters className='h-100'>
          <Col xs='12' md='5' lg='3' className='auth-form mx-auto my-auto'>
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className='auth-form__logo d-table mx-auto mb-3'
                  src={require('../images/logger_logo.svg')}
                  alt='Shards Dashboards - Login Template'
                />

                {/* Title */}
                <h5 className='auth-form__title text-center mb-4'>Log In</h5>

                {/* Form Fields */}
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <label htmlFor='InputEmail'>Email address</label>
                    <FormInput
                      type='email'
                      name='email'
                      value={email}
                      onChange={onChange}
                      placeholder='Enter email'
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor='InputPassword'>Password</label>
                    <FormInput
                      type='password'
                      name='password'
                      value={password}
                      onChange={onChange}
                      placeholder='Password'
                      minLength='6'
                      required
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme='accent'
                    className='d-table mx-auto'
                    type='submit'
                  >
                    Log In
                  </Button>
                </Form>
              </CardBody>
            </Card>

            {/* Footer */}
            <div className='auth-form__meta d-flex mt-4'>
              <Link to='/forgot-password'>Forgot your password?</Link>
              <Link to='/register' className='ml-auto'>
                Create a new account?
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
