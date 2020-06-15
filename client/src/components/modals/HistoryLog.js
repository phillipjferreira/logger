import React from 'react';

const HistoryLog = ({ history, users }) => {
  return (
    (history &&
      history.map((change, i) => {
        const user = change.user;
        const time = change.createdAt;
        const diff = Object.getOwnPropertyNames(change.diff).map(
          (difField, index) => {
            const field = difField;
            const oldValue = change.diff[difField][0];
            const newValue = change.diff[difField][1];
            return (
              <span className='history-field' key={index}>
                {(field === 'storyPoint' && 'Story Point') ||
                  (field === 'assignedTo' && 'Assigned To') ||
                  field.charAt(0).toUpperCase() + field.slice(1)}
                <span className='text-muted'> changed from </span>

                {(field === 'assignedTo' &&
                  oldValue &&
                  users.find((obj) => obj._id === oldValue).name) ||
                  oldValue}
                <span className='text-muted'> to </span>
                {(field === 'assignedTo' &&
                  newValue &&
                  users.find((obj) => obj._id === newValue).name) ||
                  newValue}
              </span>
            );
          }
        );
        return (
          <span key={i} className='history-object'>
            <span className='text-muted'>Updated on </span>
            {new Date(time).toDateString() +
              ' ' +
              new Date(time).toTimeString().slice(0, 5)}
            <span className='text-muted'> by </span>
            {user && users.find((obj) => obj._id === user).name}
            <span className='text-muted'>:</span>
            {diff}
            <br />
          </span>
        );
      })) ||
    'hi'
  );
};

export default HistoryLog;
