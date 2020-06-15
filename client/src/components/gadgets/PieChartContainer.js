import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createLoadingSelector } from '../../Selectors';
import { Col, Card, CardBody, CardHeader } from 'shards-react';
import PieChart from './PieChart';

const PieChartContainer = ({ tickets: { tickets }, isLoading }) => {
  useEffect(() => {
    setSkip(true);
  }, []);
  const [skip, setSkip] = useState(false);
  const [status, setStatus] = useState([0, 0, 0]);

  useEffect(() => {
    if (!isLoading && skip) {
      let arr = [...status];
      tickets.forEach((ticket) => {
        if (ticket.status === 'To-Do') {
          ++arr[0];
        } else if (ticket.status === 'In-Progress') {
          ++arr[1];
        } else if (ticket.status === 'Done') {
          ++arr[2];
        }
      });
      setStatus(arr);
    }
  }, [tickets]);
  return (
    skip &&
    !isLoading && (
      <Col sm='12' md='6' className='mb-4'>
        <Card small className='h-100'>
          <CardHeader className='border-bottom'>
            <h6 className='m-0'>Tickets by Status</h6>
          </CardHeader>
          <CardBody className='py-0'>
            <PieChart status={status} />
          </CardBody>
        </Card>
      </Col>
    )
  );
};
const loadingSelector = createLoadingSelector(['GET_TICKETS']);
const mapStateToProps = (state) => ({
  isLoading: loadingSelector(state),
  tickets: state.tickets,
});

export default connect(mapStateToProps, {})(PieChartContainer);
