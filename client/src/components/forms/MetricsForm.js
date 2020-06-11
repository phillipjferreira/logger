import React from 'react';
import { Form, FormSelect, Button, Container, Row, Col } from 'shards-react';

const MetricsForm = ({ onSubmit, onChange, sprints, sprint }) => {
  return (
    <div>
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Col md='6' className='form-group'>
          <label htmlFor='sprint'>Project</label>

          <FormSelect
            id='sprint'
            name='sprint'
            value={sprint}
            onChange={(e) => {
              onChange(e);
            }}
            required
          >
            <option value={''}>None</option>
            {sprints.map((sprint) => (
              <option value={sprint._id} key={sprint._id}>
                {sprint.name}
              </option>
            ))}
          </FormSelect>
        </Col>
        <Button>Load Graph</Button>
      </Form>
    </div>
  );
};

export default MetricsForm;
