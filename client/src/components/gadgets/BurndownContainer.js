import React, { useEffect, useState } from 'react';
import BurndownChart from './BurndownChart';

const BurndownContainer = ({
  sprintHistory,
  sprintLoading,
  tickets,
  view,
  sprint,
}) => {
  const [spStart, setSpStart] = useState(0);
  const [dataset, setDataset] = useState([]);
  const [time, setTime] = useState();
  const [currentSp, setCurrentSp] = useState();

  useEffect(() => {
    let sp = 0;
    tickets.map((ticket) => {
      if (ticket.storyPoint) {
        sp += Number(ticket.storyPoint);
      }
    });
    setSpStart(sp);
  }, [tickets]);

  useEffect(() => {
    let t;
    let y;
    sprintHistory.map((history) => {
      t = history.createdAt;
      if (history.diff.status[1] === 'Done' && history.storyPoint) {
        y = y - Number(history.storyPoint);
      } else if (history.diff.status[0] === 'Done' && history.storyPoint) {
        y = y + Number(history.storyPoint);
      }

      setDataset([...dataset, { t, y }]);
    });
  }, [sprintHistory]);
  console.log(dataset);
  console.log('spStart ' + spStart);
  return (
    <div>
      {'Story Point Start' + spStart}
      {sprintLoading ? (
        'Loading...'
      ) : (
        <BurndownChart
          dataset={dataset}
          spStart={spStart}
          start={sprint.startDate}
        />
      )}
    </div>
  );
};

export default BurndownContainer;
