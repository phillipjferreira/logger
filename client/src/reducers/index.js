import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menus from './menus';
import projects from './projects';

export default combineReducers({
  alert,
  auth,
  menus,
  projects,
});
