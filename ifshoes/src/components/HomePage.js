// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/Login">Login</a></li>
            <li><a href="/Signup">Signup</a></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/HomePage" exact component={HomePage} />
          <Route path="/Login" component={Login} />
          <Route path="/Signup" component={Signup} />
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;

