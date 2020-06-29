import React, { Fragment } from 'react';
import { Button } from 'shards-react';
import { useMediaQuery } from 'react-responsive';
import { NavLink as RouteNavLink } from 'react-router-dom';

const TicketLogKanbanColumnHeader = ({
  projectid,
  user,
  title,
  status,
  id,
  updateStatus,
  isActive,
}) => {
  const outputStatus = useMediaQuery({ query: '(min-width:768px)' });

  return (
    <div className='react-kanban-column-header tab-title'>
      <span>{title}</span>
      {id !== 'Backlog' && (
        <Fragment>
          {(outputStatus || user.role < 3) && (
            <span className='text-muted'>Status: {status}</span>
          )}
          {user.role >= 3 && (
            <span>
              <Button
                className='mr-2 btn-success'
                tag={RouteNavLink}
                to={`/projects/${projectid}/${id}/edit-sprint`}
              >
                Edit
              </Button>
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
            </span>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default TicketLogKanbanColumnHeader;
