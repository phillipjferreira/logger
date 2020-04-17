import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import AlertBar from './components/layout/AlertBar';

const Routes = (props) => {
  return (
    <section className='container'>
      <AlertBar />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />

        {/* <Route component={NotFound} /> */}
      </Switch>
    </section>
  );
};

export default Routes;
