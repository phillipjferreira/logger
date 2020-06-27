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

const appReducer = combineReducers({
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

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
