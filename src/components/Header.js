import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav,MDBDropdown,MDBDropdownToggle,MDBDropdownMenu,MDBDropdownItem, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from "mdbreact";
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { logout } from '../actions/auth';
import AddMedStaffDialog from "./ClinicAdmin/AddMedStaffDialog";
import AddClinicalCenterAdmin from './ClinicalCenterAdmin/AddClinicalCenterAdmin';
import AddDiagnose from './ClinicalCenterAdmin/AddDiagnose';
import AddMedicine from './ClinicalCenterAdmin/AddMedicine';

import { Link } from 'react-router-dom';

class Header extends Component {
state = {
  isOpen: false,
  logInDialog: false,
  registerDialog: false,
  newMedStaffDialog: false,
  newClinicalCenterAdminDialog: false,
  addDiagnoseDialog: false,
  addMedicineDialog: false

};

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
      <MDBNavItem>
        <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Menu</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem><Link to='/staff'>Patients</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/calendar'>Calendar</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/recipes'>Recipes</Link></MDBDropdownItem>
                  <MDBDropdownItem><Link to='/vacation'>Vacation</Link></MDBDropdownItem>
                </MDBDropdownMenu>
          </MDBDropdown>
      </MDBNavItem>
    )
  }else if (this.props.auth.currentUser.userable_type === 'App\\ClinicAdmin'){
    return(
      <MDBNavItem>
          <MDBNavLink to="/addNewMedStaff"  onClick = {this.toggleNewMedStaffDialog}>Add new staff members</MDBNavLink>
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
      <LoginDialog show={this.state.logInDialog} toggle={this.toggleLoginDialog}  />
      <RegisterDialog show={this.state.registerDialog} toggle={this.toggleRegisterDialog} />
      <AddMedStaffDialog show={this.state.newMedStaffDialog} toggle={this.toggleNewMedStaffDialog} />
      <AddClinicalCenterAdmin show={this.state.newClinicalCenterAdminDialog} toggle={this.toggleNewClinicalCenterAdminDialog} />
      <AddDiagnose show={this.state.addDiagnoseDialog} toggle={this.toggleAddDiagnoseDialog} />
      <AddMedicine show={this.state.addMedicineDialog} toggle={this.toggleAddMedicineDialog} />

      
    </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, {logout})(Header);