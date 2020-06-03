import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Timeline from './views/Timeline';
import TicketLog from './views/TicketLog';
import Board from './views/Board';
import Metrics from './views/Metrics';
import Users from './views/Users';
import AlertBar from './components/layout/AlertBar';
import PrivateRoute from './PrivateRoute';
import ProjectFormContainer from './components/forms/ProjectFormContainer';
import SprintFormContainer from './components/forms/SprintFormContainer';

const Routes = (props) => {
  return (
    <section className='container'>
      <AlertBar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/new-project'
          component={ProjectFormContainer}
        />
        <PrivateRoute
          exact
          path='/projects/:projectkey/edit-project'
          component={ProjectFormContainer}
        />
        <PrivateRoute
          exact
          path='/projects/:projectkey/new-sprint'
          component={SprintFormContainer}
        />
        <PrivateRoute
          exact
          path='/projects/:projectkey/:sprintid/edit-sprint'
          component={SprintFormContainer}
        />
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute
          exact
          path='/projects/:projectkey/timeline'
          component={Timeline}
        />
        <PrivateRoute
          exact
          path='/projects/:projectkey/ticket-log'
          component={TicketLog}
        />
        <PrivateRoute
          exact
          path='/projects/:projectkey/board'
          component={Board}
        />
        <PrivateRoute
          exact
          path='/projects/:projectkey/metrics'
          component={Metrics}
        />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
