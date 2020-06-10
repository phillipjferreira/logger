import React, { Fragment, useState } from 'react';
import { NavLink as RouteNavLink } from 'react-router-dom';
import HistoryLog from './HistoryLog';
import { Row, Col, Button, Modal } from 'shards-react';

const ViewTicket = ({
  users,
  project,
  sprints,
  ticket,
  isLoading,
  toggle,
  open,
}) => {
  const [hist, setHistory] = useState(false);
  const toggleHistory = () => {
    setHistory(!hist);
  };
  const {
    _id,
    storyPoint,
    name,
    status,
    sprint,
    assignedTo,
    assignedBy,
    created,
    updated,
    description,
    history,
  } = ticket;

  // let resolveSprint = ;

  return (
    <Modal open={open} toggle={toggle} size='lg'>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <Fragment>
          {/* Name */}
          <Row form className='mx-4'>
            <Col md='12' className='my-3'>
              <h4 className='form-text m-0'>{name}</h4>
            </Col>
          </Row>
          <Row form className='mx-4 modal-scroll font-400'>
            <Col lg='12'>
              <Row>
                {/* Status */}
                <Col md='6' className='form-group'>
                  <label htmlFor='status'>Status:&nbsp;</label>
                  <span id='status' name='status'>
                    {status}
                  </span>
                </Col>

                {/* Story Point Estimate */}
                <Col md='6' className='form-group'>
                  <label htmlFor='storyPoint'>Story Point:&nbsp;</label>
                  <span id='storyPoint' name='storyPoint'>
                    {storyPoint}
                  </span>
                </Col>
              </Row>
              <Row>
                {/* Project */}
                <Col md='6' className='form-group'>
                  <label htmlFor='project'>Project:&nbsp;</label>
                  <span disabled id='project' name='project'>
                    {project.name}
                  </span>
                </Col>
                {/* Sprint */}
                <Col md='6' className='form-group'>
                  <label htmlFor='sprint'>Sprint:&nbsp;</label>

                  <span id='sprint' name='sprint'>
                    {sprint &&
                      Array.isArray(sprints) &&
                      sprints.find((obj) => obj._id === sprint).name}
                  </span>
                </Col>
              </Row>
              <Row>
                {/* AssignedTo */}
                <Col md='6' className='form-group'>
                  <label htmlFor='assignedTo'>Assigned To:&nbsp;</label>
                  <span id='assignedTo' name='assignedTo'>
                    {assignedTo &&
                      users.find((obj) => obj._id === assignedTo).name}
                  </span>
                </Col>
                {/* Assigned By */}
                <Col md='6' className='form-group'>
                  <label htmlFor='assignedBy'>Assigned By:&nbsp;</label>
                  <span id='assignedBy' name='assignedBy'>
                    {assignedBy &&
                      users.find((obj) => obj._id === assignedBy).name}
                  </span>
                </Col>
              </Row>
              <Row>
                {/* Description */}
                <Col>
                  <label htmlFor='description'>Description:&nbsp;</label>
                  <span id='description' name='description'>
                    {description}
                  </span>
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
                    {new Date(updated).toDateString()}
                  </span>
                </Col>
              </Row>
            </Col>

            <hr />

            <Col md='12' className='form-group button-view'>
              <Button onClick={toggle} className='btn-secondary'>
                Close
              </Button>
              <Button onClick={toggleHistory} className='btn-primary'>
                {hist ? 'Hide History' : 'Show History'}
              </Button>
              <Button
                tag={RouteNavLink}
                to={`/projects/${project._id}/${_id}/edit-ticket`}
                className='btn-success'
              >
                Edit Ticket
              </Button>
            </Col>
            {/* Historyy */}
            <Col className={hist ? '' : 'hide'}>
              <label htmlFor='history'>History:&nbsp;</label>
              <span id='history' name='history'>
                <HistoryLog history={history} users={users} />
              </span>
            </Col>
          </Row>
        </Fragment>
      )}
    </Modal>
  );
};

export default ViewTicket;
