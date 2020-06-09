import React, { useState } from 'react';
import Board, { moveCard } from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';
import CustomCard from './CustomCard';
// import CustomColumnHeader from './CustomColumnHeader';

const CustomBoard = ({ onCardDragEnd, tickets, sprints, view }) => {
  let arr = [];
  const backlog = { _id: 'Backlog', name: 'Backlog' };
  Array.isArray(sprints)
    ? (arr = [...sprints, backlog])
    : (arr = [sprints, backlog]);

  let columns = arr.map((sprint) => {
    let output = [];
    sprint._id !== 'Backlog'
      ? tickets.map((ticket) => {
          if (ticket.sprint === sprint._id) {
            output.push({ title: ticket.name, id: ticket._id });
          }
        })
      : tickets.map((ticket) => {
          if (!ticket.sprint) {
            output.push({ title: ticket.name, id: ticket._id });
          }
        });
    return {
      id: sprint._id,
      title: sprint.name,
      cards: output,
    };
  });

  const board = {
    columns: columns,
  };
  // You need to control the state yourself.
  const [customBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(customBoard, source, destination);
    setBoard(updatedBoard);
  }

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
      // renderColumnHeader={({ title, status, updateStatus }) => (
      //   <CustomColumnHeader title={title} status={status} updateStatus={updateStatus} />
      // )}
    >
      {customBoard}
    </Board>
  );
};

export default CustomBoard;
