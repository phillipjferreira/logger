import React, { useState } from 'react';
import Board, { moveCard } from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import TicketLogKanbanCard from './TicketLogKanbanCard';
import TicketLogKanbanColumnHeader from './TicketLogKanbanColumnHeader';

const TicketLogKanban = ({
  onCardDragEnd,
  tickets,
  sprints,
  view,
  updateStatus,
}) => {
  const isActive = Boolean(
    sprints.find((sprint) => sprint.status === 'Active')
  );
  const backlog = { _id: 'Backlog', name: 'Backlog' };
  const arr = Array.isArray(sprints)
    ? [...sprints, backlog]
    : [sprints, backlog];

  const columns = arr.map((sprint) => {
    let output = [];
    sprint._id !== 'Backlog'
      ? tickets.forEach((ticket) => {
          if (ticket.sprint === sprint._id) {
            output.push({ title: ticket.name, id: ticket._id });
          }
        })
      : tickets.forEach((ticket) => {
          if (!ticket.sprint) {
            output.push({ title: ticket.name, id: ticket._id });
          }
        });
    return {
      id: sprint._id,
      title: sprint.name,
      status: sprint.status,
      cards: output,
    };
  });

  const board = {
    columns: columns,
  };

  const [customBoard, setBoard] = useState(board);

  const handleCardMove = (_card, source, destination) => {
    const updatedBoard = moveCard(customBoard, source, destination);
    setBoard(updatedBoard);
  };

  return (
    <Board
      onCardDragEnd={(...props) => {
        handleCardMove(...props);
        onCardDragEnd(...props);
      }}
      renderCard={(card, { dragging }) => (
        <TicketLogKanbanCard
          card={card}
          dragging={dragging}
          view={view}
        ></TicketLogKanbanCard>
      )}
      disableColumnDrag
      renderColumnHeader={({ title, status, id }) => (
        <TicketLogKanbanColumnHeader
          title={title}
          status={status}
          id={id}
          updateStatus={updateStatus}
          isActive={isActive}
        />
      )}
    >
      {customBoard}
    </Board>
  );
};

export default TicketLogKanban;
