import React, { Fragment } from 'react';
import { NavLink as RouteNavLink } from 'react-router-dom';

import { Row, Col, Button, Modal } from 'shards-react';

const ViewTicket = ({ ticket, isLoading, toggle, open }) => {
  const {
    _id,
    storyPoint,
    name,
    status,
    project,
    sprint,
    assignedTo,
    assignedBy,
    created,
    updated,
    description,
  } = ticket;
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
          <Row form className='mx-4'>
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
                    {project}
                  </span>
                </Col>
                {/* Sprint */}
                <Col md='6' className='form-group'>
                  <label htmlFor='sprint'>Sprint:&nbsp;</label>

                  <span id='sprint' name='sprint'>
                    {sprint}
                  </span>
                </Col>
              </Row>
              <Row>
                {/* AssignedTo */}
                <Col md='6' className='form-group'>
                  <label htmlFor='assignedTo'>Assigned To:&nbsp;</label>
                  <span id='assignedTo' name='assignedTo'>
                    {assignedTo}
                  </span>
                </Col>
                {/* Assigned By */}
                <Col md='6' className='form-group'>
                  <label htmlFor='assignedBy'>Assigned By:&nbsp;</label>
                  <span id='assignedBy' name='assignedBy'>
                    {assignedBy}
                  </span>
                </Col>
              </Row>
              <Row>
                {/* Description */}
                <Col>
                  <label htmlFor='description'>Description:&nbsp;</label>
                  <span
                    style={{ minHeight: '87px' }}
                    id='description'
                    name='description'>
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
              <Button
                tag={RouteNavLink}
                to={`/projects/${project}/${_id}/edit-ticket`}
                className='btn-success'>
                Edit Ticket
              </Button>
            </Col>
          </Row>
        </Fragment>
      )}
    </Modal>
  );
};

export default ViewTicket;