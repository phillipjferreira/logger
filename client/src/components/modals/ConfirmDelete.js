import React from 'react';
import { Row, Col, Button, Modal } from 'shards-react';

const ConfirmDelete = ({ open, toggle, onDelete }) => {
  return (
    <Modal open={open} toggle={toggle} size='sm'>
      {/* Text */}
      <Row form className='mx-4'>
        <Col md='12' className='my-3'>
          Are you sure you wish to delete? This action cannot be undone.
        </Col>
      </Row>
      {/* Buttons */}
      <span className='button-view mb-3'>
        <Button
          size='sm'
          theme='secondary'
          className='d-inline-block ml-3'
          onClick={toggle}
          type='button'
        >
          Cancel
        </Button>
        <Button
          size='sm'
          theme='danger'
          className='d-inline-block mr-3'
          onClick={onDelete}
          type='button'
        >
          Delete Ticket
        </Button>
      </span>
    </Modal>
  );
};

export default ConfirmDelete;
