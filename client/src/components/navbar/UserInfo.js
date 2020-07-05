import React, { useState } from 'react';
import { Button } from 'shards-react';

const UserInfo = ({ user, authUser, update }) => {
  const displayRole = ['View Only', 'User', 'Admin'];

  const [value, setValue] = useState(displayRole[user.role - 1]);
  const [save, toggleSave] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
    toggleSave(true);
  };

  const saveUser = () => {
    let temp = user;
    temp.role = displayRole.indexOf(value) + 1;
    update(temp);
    toggleSave(false);
  };

  const isDemo = authUser.name === 'Demo Admin';

  if (authUser.role === 3) {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <select value={value} onChange={onChange}>
            <option value='View Only'>View-Only</option>
            <option value='User'>User</option>
            <option value='Admin'>Admin</option>
          </select>
        </td>

        <td className='user-td'>
          {save && (
            <Button
              onClick={saveUser}
              disabled={isDemo}
              className={'btn-success user-button ' + (isDemo && 'tooltip')}
            >
              Save
              <span className={'tooltiptext ' + (!isDemo && 'hide')}>
                User role changes disabled in Demo!
              </span>
            </Button>
          )}
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{user.name}</td>
        <td>
          {value === 'View Only' && authUser._id !== user._id
            ? 'Hidden for privacy'
            : user.email}
        </td>
        <td>{value}</td>
      </tr>
    );
  }
};

export default UserInfo;
