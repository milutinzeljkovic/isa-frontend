import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { logout, me } from '../actions/auth';
import AddMedStaffDialog from "./ClinicAdmin/AddMedStaffDialog";
import AddClinicalCenterAdmin from './ClinicalCenterAdmin/AddClinicalCenterAdmin';
import AddDiagnose from './ClinicalCenterAdmin/AddDiagnose';
import AddMedicine from './ClinicalCenterAdmin/AddMedicine';
import AddOperatingRoom from './ClinicAdmin/AddOperatingRoom';

import { Link } from 'react-router-dom';
import AvailableAppointmentsDialog from './ClinicAdmin/AvailableAppointmentsDialog';
import AddAppointmentType from "./ClinicAdmin/AddAppointmentType";
import PatientSearch from "./Clinics/Search/PatientSearch";

class Header extends Component {
state = {
  isOpen: false,
  logInDialog: false,
  registerDialog: false,
  newMedStaffDialog: false,
  newClinicalCenterAdminDialog: false,
  addDiagnoseDialog: false,
  addMedicineDialog: false,
  newAppointmentDialog: false,
  newOperatingRoomDialog: false,
  newAppointmentTypeDialog: false,
  patientSearch: false
};

  componentDidMount(){
    this.props.me();
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  toggleLoginDialog = () => {
      this.setState({
          logInDialog: !this.state.logInDialog
      });
  }

  toggleRegisterDialog = () => {
    
    this.setState({
        registerDialog: !this.state.registerDialog
    });
  }

  toggleNewMedStaffDialog = () => {
    
    this.setState({
        newMedStaffDialog: !this.state.newMedStaffDialog
    });
  }

  toggleNewAppointmentDialog = () => {
    
    this.setState({
      newAppointmentDialog: !this.state.newAppointmentDialog
    });
  }

  toggleNewClinicalCenterAdminDialog = () => {
    
    this.setState({
        newClinicalCenterAdminDialog: !this.state.newClinicalCenterAdminDialog
    });
  }
toggleNewAppointmentTypeDialog = () => {
   
  this.setState({
    newAppointmentTypeDialog: !this.state.newAppointmentTypeDialog
  });
}

togglePatientSearch = () => {
   
  this.setState({
    patientSearch: !this.state.patientSearch
  });
}

toggleNewClinicalCenterAdminDialog = () => {
   
  this.setState({
      newClinicalCenterAdminDialog: !this.state.newClinicalCenterAdminDialog
  });
}

  toggleAddDiagnoseDialog = () => {
    
    this.setState({
      addDiagnoseDialog: !this.state.addDiagnoseDialog
    });
  }

  toggleAddMedicineDialog = () => {
    
    this.setState({
      addMedicineDialog: !this.state.addMedicineDialog
    });
  }

toggleNewOperatingRoomDialog = () => {
   
  this.setState({
    newOperatingRoomDialog: !this.state.newOperatingRoomDialog
  });
}


  handleLogoutButtonClick = () => {
    this.props.logout();
  }

renderRight = () => {
  if(this.props.auth.currentUser === undefined ){
    
    return(
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/login" onClick = {this.toggleLoginDialog}>Login</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/register" onClick = {this.toggleRegisterDialog}>Register</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    )
  }else if (this.props.auth.currentUser.has_loggedin === 0){
    return(
      <MDBNavbarNav right>
          <MDBNavItem>
          <MDBNavLink to="/" onClick = {()=> this.handleLogoutButtonClick()}>Logout</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>

    )
  }
  else{
    
    
    return(
      <MDBNavbarNav right>
        <MDBNavItem>
          <MDBNavLink to="/profile">{this.props.auth.currentUser.email}</MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="/" onClick = {()=> this.handleLogoutButtonClick()}>Logout</MDBNavLink>
        </MDBNavItem>
      </MDBNavbarNav>
    )
  }
}

renderLinks = () => {
  if(this.props.auth.currentUser.userable_type === 'App\\ClinicalCenterAdmin' && this.props.auth.currentUser.email !== 'admin@admin.rs'){
    return(
      <MDBNavItem>
          <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Menu</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem><Link to='/admin'>Pending requests</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/clinics/add'>New clinic</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/clinics/add/admin'>New clinic admin</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/diagnose/add' onClick = {this.toggleAddDiagnoseDialog}>New diagnose</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/medicine/add' onClick = {this.toggleAddMedicineDialog}>New medicine</Link></MDBDropdownItem>

                </MDBDropdownMenu>
          </MDBDropdown>
      </MDBNavItem>
    )
  }else if (this.props.auth.currentUser.userable_type === 'App\\Nurse' ){
    return(
      <div style = {{display:'flex'}}>
      <MDBNavItem>
        <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <span className="mr-2">Menu</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem><Link to='/staff'>Patients</Link></MDBDropdownItem>
              <MDBDropdownItem><Link to='/calendar'>Calendar</Link></MDBDropdownItem>
              <MDBDropdownItem><Link to='/prescriptions'>Prescriptions</Link></MDBDropdownItem>
              <MDBDropdownItem><Link to='/vacation'>Vacation</Link></MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
      </MDBNavItem>
      <MDBNavItem>
        <MDBDropdown>
          <MDBDropdownToggle nav caret>
            <span className="mr-2">Search</span>
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem><Link to='/patients/search' onClick = {this.togglePatientSearch}>Search patients</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
      </div>
    )
  }else if (this.props.auth.currentUser.userable_type === 'App\\Doctor' ){
    return(
      <MDBNavItem>
        <MDBDropdown>
            <MDBDropdownToggle nav caret>
              <span className="mr-2">Search</span>
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem><Link to='/patients/search' onClick = {this.togglePatientSearch}>Search patients</Link></MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
      </MDBNavItem>
    )
  }else if (this.props.auth.currentUser.userable_type === 'App\\ClinicAdmin'){
    return(
      <MDBNavItem>
        <MDBDropdown>
          <MDBDropdownToggle nav caret>
            <span className="mr-2">Menu</span>
          </MDBDropdownToggle>
          <MDBDropdownMenu>
            <MDBDropdownItem><Link to='/add/newMedicalStaff' onClick = {this.toggleNewMedStaffDialog}>New staff members</Link></MDBDropdownItem>
            <MDBDropdownItem><Link to='/add/appointment' onClick = {this.toggleNewAppointmentDialog}>New available appointment</Link></MDBDropdownItem>
            <MDBDropdownItem><Link to='/operationRoom/add' onClick = {this.toggleNewOperatingRoomDialog}>New operation room</Link></MDBDropdownItem>
            <MDBDropdownItem><Link to='/add/appointmentType' onClick = {this.toggleNewAppointmentTypeDialog}>New appointment type</Link></MDBDropdownItem>
            <MDBDropdownItem><Link to='/get/myClinic' >My clinic</Link></MDBDropdownItem>
          </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    )
  }
  else if(this.props.auth.currentUser.userable_type === 'App\\Patient'){
    return(
      <MDBNavItem>
      <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className="mr-2">Menu</span>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem><Link to='/clinics'>Clinics</Link></MDBDropdownItem>
              </MDBDropdownMenu>
        </MDBDropdown>
      </MDBNavItem>
    )
  }else if(this.props.auth.currentUser.userable_type === 'App\\ClinicalCenterAdmin' && this.props.auth.currentUser.email === 'admin@admin.rs'){
    return(
      <MDBNavItem>
          <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Menu</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem><Link to='/admin'>Pending requests</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/clinics/add'>New clinic</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/clinics/add/admin'>New clinic admin</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/add/clinical-center-admin' onClick = {this.toggleNewClinicalCenterAdminDialog}>New clinical center admin</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/diagnose/add' onClick = {this.toggleAddDiagnoseDialog}>New diagnose</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/medicine/add' onClick = {this.toggleAddMedicineDialog}>New medicine</Link></MDBDropdownItem>

                </MDBDropdownMenu>
          </MDBDropdown>
      </MDBNavItem>
    )

  }
}

renderLeft = () => {
  if(this.props.auth.currentUser === undefined){
    return(
        <MDBNavbarNav left>
          
        </MDBNavbarNav>
    )
  }else if (this.props.auth.currentUser.has_loggedin === 0){
    return(
      <MDBNavbarNav left>
        
      </MDBNavbarNav>

    )
  }else{
    return(
        <MDBNavbarNav left>
          <MDBNavItem>
            <MDBNavLink to="/home">Home</MDBNavLink>
          </MDBNavItem>
          {this.renderLinks()}
        </MDBNavbarNav>
    )
  }
}

render() {
  return (
    <Router history = {history}>
      <div id = 'header-div'>
        <MDBNavbar color="teal" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Clinical center</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            {this.renderLeft()}
            {this.renderRight()}
          </MDBCollapse>
        </MDBNavbar>
        </div>
      <LoginDialog show={this.state.logInDialog} toggle={this.toggleLoginDialog}  />
      <RegisterDialog show={this.state.registerDialog} toggle={this.toggleRegisterDialog} />
      <AddMedStaffDialog show={this.state.newMedStaffDialog} toggle={this.toggleNewMedStaffDialog} />
      <AddClinicalCenterAdmin show={this.state.newClinicalCenterAdminDialog} toggle={this.toggleNewClinicalCenterAdminDialog} />
      <AddDiagnose show={this.state.addDiagnoseDialog} toggle={this.toggleAddDiagnoseDialog} />
      <AddMedicine show={this.state.addMedicineDialog} toggle={this.toggleAddMedicineDialog} />
      <AddOperatingRoom show={this.state.newOperatingRoomDialog} toggle={this.toggleNewOperatingRoomDialog} />
      {this.state.newAppointmentDialog ? <AvailableAppointmentsDialog show={this.state.newAppointmentDialog} toggle={this.toggleNewAppointmentDialog}/> : ''}
      {this.state.newAppointmentTypeDialog ? <AddAppointmentType show={this.state.newAppointmentTypeDialog} toggle={this.toggleNewAppointmentTypeDialog}/> : ''}
      <PatientSearch show={this.state.patientSearch} toggle={this.togglePatientSearch}/>
    </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout, me})(Header);