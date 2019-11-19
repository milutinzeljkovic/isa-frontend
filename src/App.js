import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import PatientTable from './components/PatientTable';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { me } from './actions/auth';

class App extends Component {

  componentDidMount(){
    this.props.me();
  }

  render() {
    return (
      <Router history={history}>
        <Header />
        <Route path="/login" component = {LoginDialog} />
        <Route path="/register" component = {RegisterDialog} />
        
        <PatientTable/>
      </Router>
    );
  }
}


export default connect(null,{me})(App);
