import React from 'react';
import Moment from 'react-moment';
import { CardBody, Container } from 'shards-react';

const ActiveSprints = ({ sprints, projects }) => {
  const activeSprints = sprints.filter((sprint) => sprint.status === 'Active');

  const sprintDisplay = activeSprints.map((sprint, index) => (
    <tr key={index}>
      <td>
        <a
          className='text-secondary'
          href={`/projects/${sprint.project}/board`}
        >
          {sprint.name}
        </a>
      </td>
      <td>
        <a
          className='text-secondary'
          href={`/projects/${sprint.project}/ticket-log`}
        >
          {projects.length &&
            projects.find((project) => project._id === sprint.project).name}
        </a>
      </td>
      <td className='text-muted font-400'>
        <Moment date={sprint.startDate} format={'MM/DD/YY'} />
      </td>
      <td className='text-muted font-400'>
        <Moment date={sprint.endDate} format={'MM/DD/YY'} />
      </td>
    </tr>
  ));

  return (
    <CardBody className='p-0 dashboard-gadget'>
      <Container fluid className='px-0'>
        <table className='table mb-0 width-100'>
          <thead className='py-2 bg-light text-semibold border-bottom light-font'>
            <tr>
              <th>Sprint</th>
              <th>Project</th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
          <tbody>
            {sprintDisplay.some((e) => e) ? (
              sprintDisplay
            ) : (
              <tr>
                <td>No active sprints!</td>
              </tr>
            )}
          </tbody>
        </table>
      </Container>
    </CardBody>
  );
};

export default ActiveSprints;
