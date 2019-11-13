import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBIcon,  MDBRow, MDBCol, MDBInput, MDBBtn} from 'mdbreact';
import { Field, reduxForm, reset } from 'redux-form';
import { Link } from 'react-router-dom';

class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.email);
        event.preventDefault();
    }
    
    onSubmit() { 
        console.log(this.state.email, this.state.password);
        
    }

    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div className="text-center">
                        Log in to MedSoft
                    </div> 
                </MDBModalHeader>
                <MDBModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                            <MDBInput
                                label="Type your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                onChange={this.handleEmailChange}
                            />
                            <MDBInput
                                label="Type your password"
                                group
                                type="password"
                                validate
                                onChange={this.handlePasswordChange}
                            />
                            </div>
                            <div className="text-center">
                            <MDBBtn onClick = {this.onSubmit.bind(this)}>Login</MDBBtn>
                            </div>
                        </form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
    }
}

export default LoginDialog;