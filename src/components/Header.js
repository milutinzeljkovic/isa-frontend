import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import LoginDialog from './LoginDialog';
import RegisterDialog from './RegisterDialog';
import { logout } from '../actions/auth';

class Header extends Component {
state = {
  isOpen: false,
  logInDialog: false,
  registerDialog: false
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

handleLogoutButtonClick = () => {
  this.props.logout();
}

renderRight = () => {
  if(this.props.auth.currentUser === undefined ){
    console.log(this.props.auth.currentUser);
    
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
  }else{
    console.log('nije undefined');
    
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

renderLeft = () => {
  if(this.props.auth.currentUser === undefined){
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
        </MDBNavbarNav>
    )
  }
}

render() {
  return (
    <Router history = {history}>
      <MDBNavbar color="blue" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Navbar</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          {this.renderLeft()}
          {this.renderRight()}
        </MDBCollapse>
      </MDBNavbar>
      <LoginDialog show={this.state.logInDialog} toggle={this.toggleLoginDialog}  />
      <RegisterDialog show={this.state.registerDialog} toggle={this.toggleRegisterDialog} />
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