import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AlertBar from './layout/AlertBar';
import Register from './views/Register';
import Login from './views/Login';
import DemoLogin from './views/DemoLogin';
import PrivateRoute from './PrivateRoute';
import Dashboard from './views/Dashboard';
import TicketLog from './views/TicketLog';
import Board from './views/Board';
import Metrics from './views/Metrics';
import Users from './views/Users';
import ProjectForm from './views/ProjectForm';
import SprintForm from './views/SprintForm';
import NewTicketForm from './views/NewTicketForm';
import EditTicketForm from './views/EditTicketForm';

const Routes = (props) => {
  return (
    <section className='container'>
      <AlertBar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/demo-login' component={DemoLogin} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/new-project' component={ProjectForm} />
        <PrivateRoute
          exact
          path='/projects/:projectid/edit-project'
          component={ProjectForm}
        />
        <PrivateRoute
          exact
          path='/projects/:projectid/new-sprint'
          component={SprintForm}
        />
        <PrivateRoute
          exact
          path='/projects/:projectid/:sprintid/edit-sprint'
          component={SprintForm}
        />
        <PrivateRoute exact path='/make-ticket' component={NewTicketForm} />
        <PrivateRoute
          exact
          path='/projects/:projectid/:ticketid/edit-ticket'
          component={EditTicketForm}
        />
        <PrivateRoute exact path='/users' component={Users} />
        <PrivateRoute
          exact
          path='/projects/:projectid/ticket-log'
          component={TicketLog}
        />
        <PrivateRoute
          exact
          path='/projects/:projectid/board'
          component={Board}
        />
        <PrivateRoute
          exact
          path='/projects/:projectid/metrics'
          component={Metrics}
        />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
