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
} from 'shards-react';
import { editTicket, createTicket } from '../../actions/tickets';

const TicketForm = ({ initialState, editTicket, createTicket, history }) => {
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

  const { name, key, id } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    id ? editTicket(state, history) : createTicket(state, history);
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
                        {id ? 'Edit Ticket' : 'New Ticket'}
                      </h4>
                      <p className='form-text text-muted m-0'>
                        {id
                          ? 'Update ticket details here'
                          : 'Enter ticket details here'}
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
                        {/* End Date
                        <Col md='4' className='form-group'>
                          <label htmlFor='endDate'>End Date</label>
                          <FormInput
                            type='text'
                            id='endDate'
                            name='endDate'
                            value={endDate}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </Col> */}
                      </Row>

                      {/* goal
                      <label htmlFor='goal'>Goal</label>
                      <FormTextarea
                        style={{ minHeight: '87px' }}
                        id='goal'
                        name='goal'
                        value={goal}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      /> */}
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

TicketForm.propTypes = {
  initialState: PropTypes.object.isRequired,
  editTicket: PropTypes.func.isRequired,
  createTicket: PropTypes.func.isRequired,
};

export default connect(null, {
  editTicket,
  createTicket,
})(withRouter(TicketForm));
