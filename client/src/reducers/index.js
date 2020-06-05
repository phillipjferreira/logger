import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menus from './menus';
import projects from './projects';
import users from './users';
import sprints from './sprints';
import tickets from './tickets';
import loading from './loading';
import error from './error';

export default combineReducers({
  alert,
  auth,
  menus,
  projects,
  users,
  sprints,
  tickets,
  loading,
  error,
});
