import React from 'react';
import Moment from 'react-moment';
import { CardBody } from 'shards-react';
import { NavLink as RouteNavLink } from 'react-router-dom';

const AssignedTickets = ({ tickets, user, projects, viewTicket }) => {
  const handleClick = (e, id) => {
    e.stopPropagation();
    viewTicket(id);
  };

  const ticketDisplay = tickets.map(
    (ticket, index) =>
      ticket.assignedTo === user._id && (
        <div key={index} className='blog-comments__item p-3'>
          {/* Name */}
          <div className='blog-comments__meta text-mutes tab-title'>
            <a
              className='text-secondary'
              href={'#'}
              onClick={(e) => handleClick(e, ticket._id)}
            >
              {ticket.name}
            </a>
            {/* Status */}
            {ticket.status === 'To-Do' && (
              <span className='badge badge-danger badge-pill'>To-Do</span>
            )}
            {ticket.status === 'In-Progress' && (
              <span className='badge badge-warning badge-pill'>
                In-Progress
              </span>
            )}
            {ticket.status === 'Done' && (
              <span className='badge badge-success badge-pill'>Done</span>
            )}
          </div>
          {/* Project */}
          <div className='blog-comments__meta text-mutes tab-title'>
            <RouteNavLink
              className='text-secondary'
              tag={RouteNavLink}
              to={`/projects/${ticket.project}/board`}
            >
              {projects.length &&
                projects.find((project) => project._id === ticket.project).name}
            </RouteNavLink>
            {/* Date - Time */}
            <span className='text-muted font-400'>
              <Moment date={ticket.updated} format={'M/DD/YY, h:mm a'} />
            </span>
          </div>

          {/* Description */}
          <p className='m-0 my-1 mb-2 text-muted font-400'>
            {ticket.description}
          </p>
        </div>
      )
  );

  return (
    <CardBody className='p-0 dashboard-gadget'>
      {ticketDisplay.some((e) => e) ? (
        ticketDisplay
      ) : (
        <div className='blog-comments__item p-3'>
          <div className='blog-comments__meta text-mutes tab-title'>
            You don't have any tickets yet!
          </div>
        </div>
      )}
    </CardBody>
  );
};

export default AssignedTickets;
