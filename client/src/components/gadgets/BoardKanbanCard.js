import React, { Fragment } from 'react';
import { Button } from 'shards-react';
import '@lourenci/react-kanban/dist/styles.css';
import { useMediaQuery } from 'react-responsive';

const BoardKanbanCard = ({ card, dragging, view }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    view(card.id);
  };

  return (
    <div
      className={`react-kanban-card ${
        dragging ? 'react-kanban-card--dragging' : ''
      }`}
    >
      {useMediaQuery({ query: '(max-width:991px)' }) ? (
        <Fragment>
          <span className='text-ellipsis'>{card.title}</span>
          <Button
            className={'btn-primary button-right ticket-button'}
            onClick={handleClick}
          >
            View
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <span>
            <div className='react-kanban-card__title'>
              <span className='text-ellipsis'>{card.title}</span>
              <Button
                className={'btn-primary button-right ticket-button'}
                onClick={handleClick}
              >
                View
              </Button>
            </div>
          </span>
          <div className='react-kanban-card__description font-400'>
            {card.description}
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default BoardKanbanCard;
