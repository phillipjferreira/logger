import React from 'react';
import { Button } from 'shards-react';
import '@lourenci/react-kanban/dist/styles.css';

const TicketLogKanbanCard = ({ card, dragging, view }) => {
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
      <span className='text-ellipsis'>{card.title}</span>
      <Button
        className={'btn-primary button-right ticket-button'}
        onClick={handleClick}
      >
        View
      </Button>
    </div>
  );
};

export default TicketLogKanbanCard;
