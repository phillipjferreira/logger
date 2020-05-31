import React, { useState, useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
} from 'shards-react';
import {
  editProject,
  createProject,
  selectProject,
} from '../../actions/projects';

const ProjectForm = ({
  projects: { selectedProject },
  editProject,
  createProject,
}) => {
  let initialState = {
    name: '',
    key: '',
    lead: null,
    description: '',
    id: null,
  };

  if (selectedProject) {
    initialState = {
      name: selectedProject.name,
      key: selectedProject.key,
      lead: selectedProject.lead,
      description: selectedProject.description,
      id: selectedProject._id,
    };
  }

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

  const { name, key, lead, description, id } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(id);
    id ? editProject(state) : createProject(state);
  };

  return (
    <div>
      <Container fluid className='main-content-container px-4'>
        <Row>
          <Col lg='8' className='mx-auto mt-4'>
            <Card small className='edit-user-details mb-4'>
              <CardBody className='p-0'>
                {/* Form Section Title :: General */}
                <Form className='py-4' onSubmit={(e) => onSubmit(e)}>
                  <Row form className='mx-4'>
                    <Col className='mb-3'>
                      <h4 className='form-text m-0'>New Project</h4>
                      <p className='form-text text-muted m-0'>
                        Enter project details here
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

                        {/* Key */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='key'>Key</label>
                          <FormInput
                            type='text'
                            id='key'
                            name='key'
                            value={key}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </Col>
                      </Row>
                      <Row form>
                        {/* Lead */}
                        <Col md='8' className='form-group'>
                          <label htmlFor='lead'>Lead</label>
                          <FormInput
                            type='text'
                            id='lead'
                            name='lead'
                            value={lead}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </Col>
                      </Row>

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
                    </Col>
                  </Row>
                  <hr />
                  <Button
                    size='sm'
                    theme='accent'
                    className='ml-auto d-table mr-3'
                    type='submit'>
                    Save Project
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

    // <div>
    //   <h1>{name || 'Project Title'}</h1>
    //   <div>
    //     <h3>{key || 'Project Key'}</h3>
    //     <h3>{lead || 'Project Lead'}</h3>
    //     <h3>{description || 'Project description'}</h3>
    //   </div>
    // </div>
  );
};

ProjectForm.propTypes = {
  projects: PropTypes.object.isRequired,
  editProject: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects,
});

export default connect(mapStateToProps, { editProject, createProject })(
  ProjectForm
);
