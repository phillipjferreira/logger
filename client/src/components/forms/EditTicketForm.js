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
} from 'shards-react';
import { editTicket } from '../../actions/tickets';

const EditTicketForm = ({ initialState, onChange, onSubmit }) => {
  const { name, key, project } = initialState;
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
                      <h4 className='form-text m-0'>Edit Ticket</h4>
                      <p className='form-text text-muted m-0'>
                        Update ticket details here
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
                            onChange={onChange}
                          />
                        </Col>
                      </Row>
                      <Row>
                        {/* Project */}
                        <Col md='6' className='form-group'>
                          <label htmlFor='project'>Project</label>
                          <FormInput
                            readOnly
                            type='text'
                            id='project'
                            name='project'
                            value={project}
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

EditTicketForm.propTypes = {
  editTicket: PropTypes.func.isRequired,
};

export default connect(null, {
  editTicket,
})(withRouter(EditTicketForm));
