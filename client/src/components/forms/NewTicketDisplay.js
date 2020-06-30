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
  FormTextarea,
} from 'shards-react';

const NewTicketDisplay = ({
  projects,
  sprints,
  users,
  initialState,
  onChange,
  onSubmit,
}) => {
  const {
    name,
    storyPoint,
    project,
    sprint,
    assignedTo,
    assignedBy,
    description,
  } = initialState;

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
                  }}
                >
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
                          <label htmlFor='name'>Name *</label>
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
                        {/* Story Point Estimate */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='storyPoint'>Story Point *</label>
                          <FormSelect
                            id='storyPoint'
                            name='storyPoint'
                            value={storyPoint}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            required
                          >
                            <option value={''}>None</option>
                            {[1, 2, 3, 5, 8, 13, 20, 40, 100].map((num) => (
                              <option value={num} key={num}>
                                {num}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
                      <Row>
                        {/* Project */}
                        <Col md='6' className='form-group'>
                          <label htmlFor='project'>Project *</label>

                          <FormSelect
                            id='project'
                            name='project'
                            value={project}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            required
                          >
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
                            disabled={!project}
                            id='sprint'
                            name='sprint'
                            value={sprint}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          >
                            <option value={''}>Backlog</option>
                            {sprints.map((sprint) => (
                              <option value={sprint._id} key={sprint._id}>
                                {sprint.name}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
                      <Row>
                        {/* Assigned To */}
                        <Col md='6' className='form-group'>
                          <label htmlFor='assignedTo'>Assigned To</label>
                          <FormSelect
                            id='assignedTo'
                            name='assignedTo'
                            value={assignedTo}
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
                        {/* Assigned By */}
                        <Col md='6' className='form-group'>
                          <label htmlFor='assignedBy'>Assigned By</label>

                          <FormSelect
                            disabled
                            id='assignedBy'
                            name='assignedBy'
                            value={assignedBy}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          >
                            {users.map((user) => (
                              <option value={user._id} key={user._id}>
                                {user.name}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
                      <Row>
                        {/* Description */}
                        <Col>
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
                    </Col>
                  </Row>
                  <hr />
                  <Button
                    size='sm'
                    theme='accent'
                    className='ml-auto d-table mr-3'
                    type='submit'
                  >
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

NewTicketDisplay.propTypes = {
  projects: PropTypes.array.isRequired,
  sprints: PropTypes.array.isRequired,
  initialState: PropTypes.object.isRequired,
};

export default connect(null, {})(withRouter(NewTicketDisplay));
