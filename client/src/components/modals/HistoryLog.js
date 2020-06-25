import React from 'react';

const HistoryLog = ({ history }) => {
  return (
    history &&
    history.map((hist, i) => {
      const user = hist.user.name;
      const time =
        new Date(hist.createdAt).toDateString() +
        ' ' +
        new Date(hist.createdAt).toTimeString().slice(0, 5);
      const diff = Object.getOwnPropertyNames(hist.diff).map(
        (difField, index) => {
          if (hist.diff[difField].length === 0) return;
          const field = difField;
          const oldValue =
            typeof hist.diff[difField][0] === 'object' &&
            hist.diff[difField][0] !== null
              ? hist.diff[difField][0].name
              : hist.diff[difField][0];
          const newValue =
            typeof hist.diff[difField][1] === 'object' &&
            hist.diff[difField][1] !== null
              ? hist.diff[difField][1].name
              : hist.diff[difField][1];
          return (
            <span className='history-field' key={index}>
              {(field === 'storyPoint' && 'Story Point') ||
                (field === 'assignedTo' && 'Assigned To') ||
                field.charAt(0).toUpperCase() + field.slice(1)}
              <span className='text-muted'> changed from </span>
              {oldValue}
              <span className='text-muted'> to </span>
              {newValue}
            </span>
          );
        }
      );
      return (
        <span key={i} className='history-object'>
          <span className='text-muted'>Updated on </span>
          {time}
          <span className='text-muted'> by </span>
          {user}
          <span className='text-muted'>:</span>
          {diff}
          <br />
        </span>
      );
    })
  );
};

export default HistoryLog;
