import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import LoginDialog from './components/LoginDialog';

import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />
        <Route path="/login" component = {LoginDialog} />
      </Router>
    );
  }
}


export default App;
