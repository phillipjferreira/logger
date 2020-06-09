import React, { useState, Fragment } from 'react';
import { Form, Button, FormSelect } from 'shards-react';

const CustomColumnHeader = ({ title, status, id, updateStatus }) => {
  const [formData, setformData] = useState(status);

  const onChange = (e) => {
    setformData(e.target.value);
  };
  return (
    <div className='react-kanban-column-header tab-title'>
      <span>{title}</span>
      {id != 'Backlog' && (
        <Fragment>
          <span className='text-muted'>Status: {status}</span>

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              updateStatus(id, formData);
            }}
          >
            <FormSelect
              value={formData}
              onChange={onChange}
              className='sprint-select'
            >
              <option value='Planned'>Planned</option>
              <option value='Active'>Active</option>
              <option value='Complete'>Complete</option>
            </FormSelect>

            {formData !== status && (
              <Button className='btn-success' type='submit'>
                Save
              </Button>
            )}
          </Form>
        </Fragment>
      )}
    </div>
  );
};

export default CustomColumnHeader;
