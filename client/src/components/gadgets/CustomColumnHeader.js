import React from 'react';

const CustomColumnHeader = ({ title, status, updateStatus }) => {
  return (
    <div className='react-kanban-column-header'>
      <span>{title}</span>
      <span>{status}</span>
      <form onSubmit={updateStatus}>
        <span>
          <select>
            <option value='Planned'>Planned</option>
            <option value='Active'>Active</option>
            <option value='Complete'>Complete</option>
          </select>
        </span>
        <span>
          <button className='react-kanban-column-header__button' type='submit'>
            Save
          </button>
        </span>
      </form>
    </div>
  );
};

export default CustomColumnHeader;
