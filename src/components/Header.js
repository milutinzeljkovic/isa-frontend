import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import history from '../history';
import LoginDialog from './LoginDialog';

class Header extends Component {
state = {
  isOpen: false,
  logInDialog: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

toggleLoginDialog = () => {
    console.log('toggle');
    
    this.setState({
        logInDialog: !this.state.logInDialog
    });
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
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="#!">Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/login" onClick = {this.toggleLoginDialog}>Login</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      <LoginDialog show={this.state.logInDialog} toggle={this.toggleLogInDialog}  />

    </Router>
    );
  }
}

export default Header;