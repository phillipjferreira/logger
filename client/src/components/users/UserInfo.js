import React, { useState } from 'react';
import { Form, FormSelect } from 'shards-react';

const UserInfo = ({ user, role, update }) => {
  const displayRole = ['View Only', 'User', 'Dev', 'Admin'];

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

  if (role == 4) {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <select value={value} onChange={onChange}>
          <option value='View Only'>View Only</option>
          <option value='User'>User</option>
          <option value='Dev'>Dev</option>
          <option value='Admin'>Admin</option>
        </select>
        <td>{save && <button onClick={saveUser}>Save</button>}</td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{value}</td>
      </tr>
    );
  }
};

export default UserInfo;
