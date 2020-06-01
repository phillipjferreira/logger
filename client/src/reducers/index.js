import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menus from './menus';
import projects from './projects';
import users from './users';

export default combineReducers({
  alert,
  auth,
  menus,
  projects,
  users,
});
