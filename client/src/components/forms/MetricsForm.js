import React from 'react';
import { Form, FormSelect, Button, Col } from 'shards-react';

const MetricsForm = ({ onSubmit, onChange, sprints, sprint }) => {
  return (
    <div>
      <Form
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <Col md='6' className='form-group'>
          <label htmlFor='sprint'>Choose Sprint:</label>

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

          <Button>Load Graph</Button>
        </Col>
      </Form>
    </div>
  );
};

export default MetricsForm;
