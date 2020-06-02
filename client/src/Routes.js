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
import ProjectForm from './components/forms/ProjectForm';
import SprintForm from './components/forms/SprintForm';
import PrivateRoute from './PrivateRoute';

const Routes = (props) => {
  return (
    <section className='container'>
      <AlertBar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/edit-project' component={ProjectForm} />
        <PrivateRoute
          exact
          path='/:projectid/edit-sprint'
          component={SprintForm}
        />
        <PrivateRoute
          exact
          path='/:projectid/edit-sprint/:sprintid'
          component={SprintForm}
        />
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute exact path='/:projectid/timeline' component={Timeline} />
        <PrivateRoute
          exact
          path='/:projectid/ticket-log'
          component={TicketLog}
        />
        <PrivateRoute exact path='/:projectid/board' component={Board} />
        <PrivateRoute exact path='/:projectid/metrics' component={Metrics} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
