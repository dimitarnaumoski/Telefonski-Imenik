import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';
import '../src/App.css';

import KontaktState from './context/kontakt/KontaktState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/Alert/AlertState';
import setAuthToken from './utlis/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <KontaktState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/info" component={About} />
                  <Route exact path="/registracija" component={Register} />
                  <Route exact path="/najava" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </KontaktState>
    </AuthState>
  );
};

export default App;
