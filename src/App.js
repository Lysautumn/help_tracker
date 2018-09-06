import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';


import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LandingPage from './components/LandingPage/LandingPage';
import AddPage from './components/AddPage/AddPage';
import EventEditPage from './components/EventEditPage/EventEditPage';
import SubmitDetailsPage from './components/SubmitDetailsPage/SubmitDetailsPage';

import './styles/main.css';


const App = () => (
  <div>
    <Header />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={LandingPage}
        />
        <Route
          path="/add"
          component={AddPage}
        />
        <Route
          path="/editEvent/:id"
          component={EventEditPage}
        />
        <Route
          path="/submitEvent/:id"
          component={SubmitDetailsPage}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </Router>
  </div>
);

export default App;
