import React from 'react';
import { Button } from 'shards-react';
import '@lourenci/react-kanban/dist/styles.css';

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
      <span>
        <div className='react-kanban-card__title'>
          <span>{card.title}</span>
          <Button className={'btn-primary'} onClick={handleClick}>
            View
          </Button>
        </div>
      </span>
      <div className='react-kanban-card__description font-400'>
        {card.description}
      </div>
    </div>
  );
};

export default BoardKanbanCard;
