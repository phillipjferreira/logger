import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../actions/alert';
import { register } from '../actions/auth';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  // CardFooter,
  Form,
  FormGroup,
  FormInput,
  Button,
} from 'shards-react';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <Container fluid className='main-content-container h-100 px-4'>
        <Row noGutters className='h-100'>
          <Col lg='3' md='5' className='auth-form mx-auto my-auto'>
            <Card>
              <CardBody>
                {/* Logo */}
                <img
                  className='auth-form__logo d-table mx-auto mb-3'
                  src={require('../images/shards-dashboards-logo.svg')}
                  alt='Shards Dashboards - Register Template'
                />

                {/* Title */}
                <h5 className='auth-form__title text-center mb-4'>
                  Create New Account
                </h5>

                {/* Form Fields */}
                <Form onSubmit={onSubmit}>
                  <FormGroup>
                    <label htmlFor='InputName'>Full Name</label>
                    <FormInput
                      type='text'
                      name='name'
                      value={name}
                      onChange={onChange}
                      placeholder='Enter name'
                      required
                    />
                  </FormGroup>
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
                  <FormGroup>
                    <label htmlFor='InputPassword2'>Confirm Password</label>
                    <FormInput
                      type='password'
                      name='password2'
                      value={password2}
                      onChange={onChange}
                      placeholder='Repeat Password'
                      minLength='6'
                      required
                    />
                  </FormGroup>
                  <Button
                    pill
                    theme='accent'
                    className='d-table mx-auto'
                    type='submit'>
                    Create Account
                  </Button>
                </Form>
              </CardBody>

              {/* Social Icons
              <CardFooter>
                <ul className='auth-form__social-icons d-table mx-auto'>
                  <li>
                    <a href='#'>
                      <i className='fab fa-facebook-f' />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fab fa-twitter' />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fab fa-github' />
                    </a>
                  </li>
                  <li>
                    <a href='#'>
                      <i className='fab fa-google-plus-g' />
                    </a>
                  </li>
                </ul>
              </CardFooter> */}
            </Card>

            {/* Meta Details */}
            <div className='auth-form__meta d-flex mt-4'>
              <Link to='/login' className='ml-auto'>
                Already a user? Sign In.
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
