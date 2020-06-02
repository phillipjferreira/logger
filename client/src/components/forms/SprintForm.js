import React, { useReducer, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
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
import {
  editSprint,
  createSprint,
  selectSprint,
  loadSprints,
} from '../../actions/sprints';

const SprintForm = ({
  sprints: { sprints, activeSprint, sprintsLoading },
  users: { users },
  editSprint,
  createSprint,
  loadSprints,
  history,
}) => {
  useEffect(() => {
    loadSprints();
  }, [loadSprints]);

  let { projectid, sprintid } = useParams();
  let initialState = {
    name: '',
    startDate: '',
    endDate: '',
    goal: '',
    id: '',
  };

  if (sprintid && !sprintsLoading) {
    let sprint = sprints.find((sprint) => {
      return sprint._id === sprintid;
    });
    initialState = {
      name: sprint.name,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      goal: sprint.goal,
      id: sprint._id,
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
                        {/* Start Date */}
                        <Col md='4' className='form-group'>
                          <label htmlFor='startDate'>Start Date</label>
                          <FormInput
                            type='text'
                            id='startDate'
                            name='startDate'
                            value={startDate}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        </Col>
                        {/* End Date */}
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
                    type='submit'>
                    Save Sprint
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

SprintForm.propTypes = {
  sprints: PropTypes.object.isRequired,
  editSprint: PropTypes.func.isRequired,
  createSprint: PropTypes.func.isRequired,
  loadSprints: PropTypes.func.isRequired,
  selectSprint: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  sprints: state.sprints,
  users: state.users,
});

export default connect(mapStateToProps, {
  editSprint,
  createSprint,
  selectSprint,
  loadSprints,
})(withRouter(SprintForm));
