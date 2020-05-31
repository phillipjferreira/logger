import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import AlertBar from './components/layout/AlertBar';
import ProjectForm from './components/forms/ProjectForm';
import PrivateRoute from './PrivateRoute';

const Routes = (props) => {
  return (
    <section className='container'>
      <AlertBar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/make-ticket' component={ProjectForm} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
