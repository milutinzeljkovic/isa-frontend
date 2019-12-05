import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import Profile from './components/Users/Profile';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import PatientTable from './components/Patients/PatientTable';
import LocationDialog from './components/Location/LocationDialog';
import AddClinicDialog from './components/Clinics/AddClinicDialog';
import SearchClinicDialog from './components/Clinics/Search/SearchClinicDialog';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { me } from './actions/auth';
import PatientTableByClinic from './components/Patients/PatientTableByClinic';
import AddClinicAdmin from './components/ClinicalCenterAdmin/AddClinicAdmin';
import AddClinicalCenterAdmin from './components/ClinicalCenterAdmin/AddClinicalCenterAdmin';
import AddMedStaffDialog from './components/ClinicAdmin/AddMedStaffDialog';
import ChangePassword from './components/ChangePassword';
<<<<<<< HEAD
import AddDiagnose from './components/ClinicalCenterAdmin/AddDiagnose';
import AddMedicine from './components/ClinicalCenterAdmin/AddMedicine';
=======
import AvailableAppointmentsDialog from './components/ClinicAdmin/AvailableAppointmentsDialog';
>>>>>>> 2.3.-medical-staff-profile

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
        <Route path='/clinics' exact component = {SearchClinicDialog} />
        <Route path='/clinics/add/admin' exact component = {AddClinicAdmin} />
        <Route path='/add/clinical-center-admin' exact component = {AddClinicalCenterAdmin} />
        <Route path='/add/newMedicalStaff' exact component = {AddMedStaffDialog} />
        <Route path='/change-password' exact component = {ChangePassword}/>
<<<<<<< HEAD
        <Route path='/diagnose/add' exact component = {AddDiagnose}/>
        <Route path='/medicine/add' exact component = {AddMedicine}/>

=======
        <Route path='/add/appointment' exact component = {AvailableAppointmentsDialog}/>
>>>>>>> 2.3.-medical-staff-profile
      </Router>
    );
  }
}


export default connect(null,{me})(App);
