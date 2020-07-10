import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MetaTags from 'react-meta-tags';
import Landing from './views/Landing';
import Routes from './Routes';
import Default from './Default';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-datepicker/dist/react-datepicker.css';
import './assets/main.scss';
import './App.css';

// Meta img
import metaImg from './images/landing/dashboard.png';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Default>
          <MetaTags>
            <meta property='og:image' content={metaImg} />
            <meta
              property='og:description'
              content='The Ticket Solution for Every Software Team'
            />
            <meta
              property='og:url'
              content='https://www.logger.phillipferreira.com'
            />
            <meta property='og:title' content='Logger' />
          </MetaTags>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Default>
      </Router>
    </Provider>
  );
};

export default App;
