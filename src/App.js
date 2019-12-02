import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import Profile from './components/Users/Profile';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
<<<<<<< HEAD
import PatientTable from './components/Patients/PatientTable';
=======
import PatientTable from './components/PatientTable';
import LocationDialog from './components/Location/LocationDialog';
import AddClinicDialog from './components/Clinics/AddClinicDialog';

>>>>>>> location
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { me } from './actions/auth';
import PatientTableByClinic from './components/Patients/PatientTableByClinic';

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
        <Route path='/admin' exact component = {PatientTable} />
        <Route path='/profile' exact component = {Profile} />
        <Route path='/staff' exact component = {PatientTableByClinic} />
        <Route path='/location' exact component = {LocationDialog} />
        <Route path='/clinics/add' exact component = {AddClinicDialog} />
      </Router>
    );
  }
}


export default connect(null,{me})(App);
