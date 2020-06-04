import React from 'react';
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
  FormSelect,
} from 'shards-react';

const NewTicketForm = ({
  projects,
  sprints,
  initialState,
  onChange,
  onSubmit,
}) => {
  const { name, key, project, sprint } = initialState;

  return (
    <div>
      <Container fluid className='main-content-container px-4'>
        <Row>
          <Col lg='8' className='mx-auto mt-4'>
            <Card small className='edit-user-details mb-4'>
              <CardBody className='p-0'>
                {/* Title */}
                <Form
                  className='py-4'
                  onSubmit={(e) => {
                    onSubmit(e);
                  }}>
                  <Row form className='mx-4'>
                    <Col className='mb-3'>
                      <h4 className='form-text m-0'>New Ticket</h4>
                      <p className='form-text text-muted m-0'>
                        Enter ticket details here
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
                            required
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
                            required
                          />
                        </Col>
                      </Row>
                      <Row>
                        {/* Project */}
                        <Col md='6' className='form-group'>
                          <label htmlFor='project'>Project</label>

                          <FormSelect
                            id='project'
                            name='project'
                            value={project}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            required>
                            <option value={''}>None</option>
                            {projects.map((project) => (
                              <option value={project._id} key={project._id}>
                                {project.name}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                        {/* Sprint */}
                        <Col md='6' className='form-group'>
                          <label htmlFor='sprint'>Sprint</label>

                          <FormSelect
                            id='sprint'
                            name='sprint'
                            value={sprint}
                            onChange={(e) => {
                              onChange(e);
                            }}>
                            <option value={''}>Backlog</option>
                            {sprints.map((sprint) => (
                              <option value={sprint._id} key={sprint._id}>
                                {sprint.name}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                  <Button
                    size='sm'
                    theme='accent'
                    className='ml-auto d-table mr-3'
                    type='submit'>
                    Save Ticket
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

NewTicketForm.propTypes = {
  projects: PropTypes.array.isRequired,
  sprints: PropTypes.array.isRequired,
  initialState: PropTypes.object.isRequired,
};

export default connect(null, {})(withRouter(NewTicketForm));
