import React, { useState } from 'react';
import Board, { moveCard } from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import BoardKanbanCard from './BoardKanbanCard';

const BoardKanban = ({ user, tickets, onCardDragEnd, view }) => {
  let todoTickets = [],
    inprogressTickets = [],
    doneTickets = [];
  tickets.forEach((ticket) => {
    let obj = {
      title: ticket.name,
      description:
        ticket.description && ticket.description.length > 55
          ? ticket.description.substring(0, 54).concat('...')
          : ticket.description,
      id: ticket._id,
    };
    switch (ticket.status) {
      case 'In-Progress':
        inprogressTickets.push(obj);
        break;
      case 'Done':
        doneTickets.push(obj);
        break;
      default:
        todoTickets.push(obj);
        break;
    }
  });
  const board = {
    columns: [
      {
        id: 0,
        title: 'To-Do',
        cards: todoTickets,
      },
      {
        id: 1,
        title: 'In-Progress',
        cards: inprogressTickets,
      },
      {
        id: 2,
        title: 'Done',
        cards: doneTickets,
      },
    ],
  };

  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }

  return (
    <Board
      onCardDragEnd={(...props) => {
        handleCardMove(...props);
        onCardDragEnd(...props);
      }}
      renderCard={(card, { dragging }) => (
        <BoardKanbanCard
          card={card}
          dragging={dragging}
          view={view}
        ></BoardKanbanCard>
      )}
      disableColumnDrag
      disableCardDrag={user.role <= 1}
    >
      {controlledBoard}
    </Board>
  );
};

export default BoardKanban;
