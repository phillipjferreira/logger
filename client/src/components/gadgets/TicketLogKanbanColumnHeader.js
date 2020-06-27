import React, { Fragment } from 'react';
import { Button } from 'shards-react';

const TicketLogKanbanColumnHeader = ({
  title,
  status,
  id,
  updateStatus,
  isActive,
}) => {
  return (
    <div className='react-kanban-column-header tab-title'>
      <span>{title}</span>
      {id !== 'Backlog' && (
        <Fragment>
          <span className='text-muted'>Status: {status}</span>
          {status === 'Planned' && (
            <Button
              disabled={isActive}
              className={'btn-success ' + (isActive && 'tooltip')}
              onClick={() => updateStatus(id, 'Active')}
            >
              Start Sprint
              <span className={'tooltiptext ' + (!isActive && 'hide')}>
                Complete the active sprint to start a new one!
              </span>
            </Button>
          )}
          {status === 'Active' && (
            <Button
              className='btn-success'
              onClick={() => updateStatus(id, 'Complete')}
            >
              Complete Sprint
            </Button>
          )}
          {status === 'Complete' && (
            <Button className='btn-secondary' disabled>
              Completed
            </Button>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TicketLogKanbanColumnHeader;
