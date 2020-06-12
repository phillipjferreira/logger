import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
} from 'shards-react';
import { editProject, createProject } from '../../actions/projects';

const ProjectDisplay = ({
  users,
  initialState,
  editProject,
  createProject,
  history,
}) => {
  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const { name, lead, description, id } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    id ? editProject(state, history) : createProject(state, history);
  };

  return (
    <div>
      <Container fluid className='main-content-container px-4'>
        <Row>
          <Col lg='8' className='mx-auto mt-4'>
            <Card small className='edit-user-details mb-4'>
              <CardBody className='p-0'>
                {/* Title */}
                <Form className='py-4' onSubmit={(e) => onSubmit(e)}>
                  <Row form className='mx-4'>
                    <Col className='mb-3'>
                      <h4 className='form-text m-0'>
                        {id ? 'Edit Project' : 'New Project'}
                      </h4>
                      <p className='form-text text-muted m-0'>
                        {id
                          ? 'Update project details here'
                          : 'Enter project details here'}
                      </p>
                    </Col>
                  </Row>
                  <Row form className='mx-4'>
                    <Col lg='12'>
                      <Row form>
                        {/* Name */}
                        <Col md='8' className='form-group'>
                          <label htmlFor='name'>Name</label>
                          <FormInput
                            id='name'
                            name='name'
                            value={name}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </Col>
                        {/* Lead */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='lead'>Lead</label>
                          <FormSelect
                            id='lead'
                            name='lead'
                            value={lead}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          >
                            <option value={''}>None</option>
                            {users.map((user) => (
                              <option value={user._id} key={user._id}>
                                {user.name}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
                      <Row form>
                        {/* Description */}
                        <label htmlFor='description'>Description</label>
                        <FormTextarea
                          style={{ minHeight: '87px' }}
                          id='description'
                          name='description'
                          value={description}
                          onChange={(e) => {
                            onChange(e);
                          }}
                        />
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <Button
                    size='sm'
                    theme='accent'
                    className='ml-auto d-table mr-3'
                    type='submit'
                  >
                    Save Project
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

ProjectDisplay.propTypes = {
  initialState: PropTypes.object.isRequired,
  editProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default connect(null, { editProject, createProject })(
  withRouter(ProjectDisplay)
);
