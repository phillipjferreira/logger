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
} from 'shards-react';
import { editSprint, createSprint } from '../../actions/sprints';
import DatePicker from 'react-datepicker';

const SprintDisplay = ({
  initialState,
  editSprint,
  createSprint,
  history,
  projectid,
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

  const onStartDateChange = (date) => {
    dispatch({ field: 'startDate', value: date });
  };

  const onEndDateChange = (date) => {
    dispatch({ field: 'endDate', value: date });
  };

  const { name, startDate, endDate, goal, id } = state;

  const onSubmit = (e) => {
    e.preventDefault();
    id
      ? editSprint({ ...state, project: projectid }, history)
      : createSprint({ ...state, project: projectid }, history);
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
                        {id ? 'Edit Sprint' : 'New Sprint'}
                      </h4>
                      <p className='form-text text-muted m-0'>
                        {id
                          ? 'Update sprint details here'
                          : 'Enter sprint details here'}
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
                        {/* Start Date */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='startDate'>Start Date *</label>
                          <DatePicker
                            id='startDate'
                            name='startDate'
                            // selected={'5/11'}
                            selected={startDate ? new Date(startDate) : null}
                            onChange={onStartDateChange}
                            required
                          />
                        </Col>
                        {/* End Date */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='endDate'>End Date *</label>
                          <DatePicker
                            id='endDate'
                            name='endDate'
                            selected={'5/12'}
                            selected={endDate ? new Date(endDate) : null}
                            onChange={onEndDateChange}
                            required
                          />
                        </Col>
                      </Row>

                      {/* goal */}
                      <label htmlFor='goal'>Goal</label>
                      <FormTextarea
                        style={{ minHeight: '87px' }}
                        id='goal'
                        name='goal'
                        value={goal}
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
                    type='submit'
                  >
                    Save Sprint
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

SprintDisplay.propTypes = {
  initialState: PropTypes.object.isRequired,
  editSprint: PropTypes.func.isRequired,
  createSprint: PropTypes.func.isRequired,
  projectid: PropTypes.number.isRequired,
};

export default connect(null, {
  editSprint,
  createSprint,
})(withRouter(SprintDisplay));
