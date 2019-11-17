import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Route path="/login" component = {LoginDialog} />
        <Route path="/register" component = {RegisterDialog} />
      </Router>
    );
  }
}


export default App;
