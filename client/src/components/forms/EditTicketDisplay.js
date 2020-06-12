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
import { editTicket } from '../../actions/tickets';

const EditTicketDisplay = ({
  initialState,
  onChange,
  onSubmit,
  sprints,
  projects,
  users,
  lastUpdated,
}) => {
  const {
    storyPoint,
    name,
    status,
    project,
    sprint,
    assignedTo,
    assignedBy,
    created,
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
                <Form className='py-4' onSubmit={(e) => onSubmit(e)}>
                  <Row form className='mx-4'>
                    <Col md='8' className='mb-3'>
                      <h4 className='form-text m-0'>Edit Ticket</h4>
                      <p className='form-text text-muted m-0'>
                        Update ticket details here
                      </p>
                    </Col>
                    {/* Story Point Estimate -- Large Device */}
                    <Col
                      md='2'
                      className='form-group story label-right hide-small'
                    >
                      <label htmlFor='storyPoint'>
                        Story
                        <br />
                        Point
                      </label>
                    </Col>
                    <Col md='2' className='form-group story hide-small'>
                      <FormSelect
                        id='storyPoint'
                        name='storyPoint'
                        value={storyPoint}
                        onChange={(e) => {
                          onChange(e);
                        }}
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
                        {/* Status */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='status'>Status</label>
                          <FormSelect
                            id='status'
                            name='status'
                            value={status}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          >
                            <option value={''}>None</option>
                            {['To-Do', 'In-Progress', 'Done'].map((stat) => (
                              <option value={stat} key={stat}>
                                {stat}
                              </option>
                            ))}
                          </FormSelect>
                        </Col>
                      </Row>
                      {/* Story Point Estimate -- Small Device */}
                      <Row className='hide-large'>
                        <Col md='6' className='form-group'>
                          <label htmlFor='storyPoint'>Story Point</label>
                          <FormSelect
                            id='storyPoint'
                            name='storyPoint'
                            value={storyPoint}
                            onChange={(e) => {
                              onChange(e);
                            }}
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
                          <label htmlFor='project'>Project</label>
                          <FormSelect
                            disabled
                            id='project'
                            name='project'
                            value={project}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            required
                          >
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
                        {/* AssignedTo */}
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
                      <br />
                      <Row>
                        {/* Created */}
                        <Col md='6' className='form-group mb-0'>
                          <label htmlFor='created'>Created:&nbsp;</label>
                          <span id='created' name='created'>
                            {new Date(created).toDateString()}
                          </span>
                        </Col>
                        {/* Last Updated */}
                        <Col md='6' className='form-group mb-0'>
                          <label htmlFor='updated'>Last Updated:&nbsp;</label>
                          <span id='updated' name='updated'>
                            {new Date(lastUpdated).toDateString()}
                          </span>
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

EditTicketDisplay.propTypes = {
  editTicket: PropTypes.func.isRequired,
};

export default connect(null, {
  editTicket,
})(withRouter(EditTicketDisplay));
