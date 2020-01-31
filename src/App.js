import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Header from './components/Header';
import Profile from './components/Users/Profile';
import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';
import PatientTable from './components/Patients/PatientTable';
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
import AddDiagnose from './components/ClinicalCenterAdmin/AddDiagnose';
import AddMedicine from './components/ClinicalCenterAdmin/AddMedicine';
import AvailableAppointmentsDialog from './components/ClinicAdmin/AvailableAppointmentsDialog';
import WorkingCalendar from './components/WorkingCalendar'
import PrescriptionsTable from './components/Nurse/PrescriptionsTable';
import PageNotFound from './components/NotFound/PageNotFound';
import PatientHomePage from './components/HomePage/PatientHomePage';
import AddOperatingRoom from './components/ClinicAdmin/AddOperatingRoom';
import AddAppointmentType from './components/ClinicAdmin/AddAppointmentType';
import PatientSearch from './components/Clinics/Search/PatientSearch';
import PatientSearchResultsTable from './components/Patients/PatientsSearchResultsTable';
import AdminsClinicDetails from './components/ClinicAdmin/AdminsClinicDetails';
import PatientProfileSearch from './components/Patients/PatientProfileSearch';
import DoctorHomePage from './components/HomePage/DoctorHomePage';
import ClinicAdminHomePage from './components/HomePage/ClinicAdminHomePage';
import AdminOptionPage from './components/ClinicAdmin/AdminOptionPage';
import ClinicAdminUpdatePage from './components/ClinicAdmin/ClinicAdminUpdatePage';

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
        
        { this.props.auth.currentUser !== undefined ? <Route path='/admin' exact render = {()=>{
          if(this.props.auth !== undefined && this.props.auth.currentUser.userable_type === 'App\\ClinicalCenterAdmin'){
            return <PatientTable />
          }else{
            return <PageNotFound />
          }
        }} /> : ''}
        <Route path='/profile' exact render = {()=>{
          return <Profile />
        }} />
        <Route path='/staff' exact component = {PatientTableByClinic} />
        <Route path='/doctor/all-patients' exact component = {PatientTableByClinic} />
        <Route path='/clinics/add' exact component = {AddClinicDialog} />
        <Route path='/clinics' exact component = {SearchClinicDialog} />
        <Route path='/clinics/add/admin' exact component = {AddClinicAdmin} />
        <Route path='/add/clinical-center-admin' exact component = {AddClinicalCenterAdmin} />
        <Route path='/add/newMedicalStaff' exact component = {AddMedStaffDialog} />
        <Route path='/change-password' exact component = {ChangePassword}/>
        <Route path='/diagnose/add' exact component = {AddDiagnose}/>
        <Route path='/medicine/add' exact component = {AddMedicine}/>

        <Route path='/vacation' exact component = {WorkingCalendar}/>
        <Route path='/calendar' exact component = {WorkingCalendar}/>
        <Route path='/doctor/work-calendar' exact component = {WorkingCalendar}/>

        <Route path='/prescriptions' exact component = {PrescriptionsTable}/>

        <Route path='/nf' exact component = {PageNotFound} />
        <Route path='/add/appointment' exact component = {AvailableAppointmentsDialog}/>
        { this.props.auth.currentUser !==undefined ? <Route path='/home' exact render = {()=>{
          if(this.props.auth !== undefined && this.props.auth.currentUser.userable_type === 'App\\Patient'){
            return <PatientHomePage />
          }else if(this.props.auth !== undefined && this.props.auth.currentUser.userable_type === 'App\\Doctor'){
            return <DoctorHomePage />
          }else if(this.props.auth !== undefined && this.props.auth.currentUser.userable_type === 'App\\ClinicAdmin'){
            return <ClinicAdminHomePage />
          }
        }} /> : ''}
        <Route path='/operationRoom/add' exact component = {AddOperatingRoom}/>
        <Route path='/add/appointment' exact component = {AvailableAppointmentsDialog}/>
        <Route path='/add/appointmentType' exact component = {AddAppointmentType}/>
        <Route path='/patients/search' exact component = {PatientSearch}/>
        <Route path='/patients/searchResults' exact component = {PatientSearchResultsTable}/>
        <Route path='/get/myClinic' exact component = {AdminsClinicDetails}/>
        <Route path='/patient/profile' exact component = {PatientProfileSearch}/>

        <Route path='/clinic-admin/all-doctors' exact render={(props) => <AdminOptionPage {...props} mode={'Doctor mode'} />}/>
        <Route path='/clinic-admin/all-appointment-types' exact render={(props) => <AdminOptionPage {...props} mode={'App type mode'} />}/>
        <Route path='/clinic-admin/all-operating-rooms' exact render={(props) => <AdminOptionPage {...props} mode={'Op room mode'}/>}/>

        <Route path='/clinic-admin/update-doctor' exact render={(props) => <ClinicAdminUpdatePage {...props} mode={'Doctor mode'}/>}/>
        <Route path='/clinic-admin/update-appointment-types' exact render={(props) => <ClinicAdminUpdatePage {...props} mode={'App type mode'}/>}/>
        <Route path='/clinic-admin/update-operating-rooms' exact render={(props) => <ClinicAdminUpdatePage {...props} mode={'Op room mode'}/>}/>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps,{me})(App);
