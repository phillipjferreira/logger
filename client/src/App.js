import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.scss';
import './App.css';

// Redux
// import { Provider } from 'react-redux';
// import store from './store';
// import { loadUser } from './actions/auth';
// import setAuthToken from './utils/setAuthToken';

const App = () => {
  //   useEffect(() => {
  //     setAuthToken(localStorage.token);
  //     store.dispatch(loadUser());
  //   }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
