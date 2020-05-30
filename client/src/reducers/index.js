import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import menus from './menus';

export default combineReducers({
  alert,
  auth,
  menus,
});
