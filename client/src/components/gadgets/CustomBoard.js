import React, { useState } from 'react';
import Board, { moveCard } from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import CustomCard from './CustomCard';
import CustomColumnHeader from './CustomColumnHeader';

const CustomBoard = ({
  onCardDragEnd,
  tickets,
  sprints,
  view,
  updateStatus,
}) => {
  let arr = [];
  const isActive = Boolean(
    sprints.find((sprint) => sprint.status === 'Active')
  );
  const backlog = { _id: 'Backlog', name: 'Backlog' };
  Array.isArray(sprints)
    ? (arr = [...sprints, backlog])
    : (arr = [sprints, backlog]);

  let columns = arr.map((sprint) => {
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
  // You need to control the state yourself.
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
        <CustomCard card={card} dragging={dragging} view={view}></CustomCard>
      )}
      disableColumnDrag
      renderColumnHeader={({ title, status, id }) => (
        <CustomColumnHeader
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

export default CustomBoard;
