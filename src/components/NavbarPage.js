import React, { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import { connect } from 'react-redux'

class NavbarPage extends Component {

    onLoginClickHandler = () => {
        this.props.toggleModalLogin();
    }

    onRegisterClickHandler = () => {
        this.props.toggleModalRegister();
    }

    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Clinic center</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <NavDropdown title="Profile" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#!">Dropdown item neki</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link onClick = { this.onLoginClickHandler }>Login</Nav.Link>
                    <Nav.Link onClick = { this.onRegisterClickHandler }>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return {
      showLogin: state.showLoginModal, 
      showRegister: state.showRegisterModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        toggleModalLogin: () => dispatch({type: 'LoginToggle'}),
        toggleModalRegister: () => dispatch({type: 'RegisterToggle'})
    }; 
};

export default connect(mapStateToProps,mapDispatchToProps)(NavbarPage);