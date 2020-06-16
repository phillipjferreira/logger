import React from 'react';
import Moment from 'react-moment';
import { CardBody } from 'shards-react';

const AssignedTickets = ({ tickets, user, projects, viewTicket }) => {
  const handleClick = (e, id) => {
    e.stopPropagation();
    viewTicket(id);
  };
  return (
    <CardBody className='p-0'>
      {tickets.map(
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
              <div className='blog-comments__meta text-mutes tab-title'>
                <a
                  className='text-secondary'
                  href={`/projects/${ticket.project}/board`}
                >
                  {projects.length &&
                    projects.find((project) => project._id === ticket.project)
                      .name}
                </a>

                <span className='text-muted font-400'>
                  <Moment date={ticket.updated} format={'M/DD/YY, h:mm a'} />
                </span>
              </div>

              {/* Content :: Body */}
              <p className='m-0 my-1 mb-2 text-muted font-400'>
                {ticket.description}
              </p>
            </div>
          )
      )}
    </CardBody>
  );
};

export default AssignedTickets;
