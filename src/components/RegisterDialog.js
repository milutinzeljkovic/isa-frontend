import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import {register} from '../actions/auth';


class RegisterDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            last_name: '',
            address: '',
            ensurance_id: '',
            city: '',
            state: '',
            email: '',
            password: '',
            phone_number: '',
            password_confirmation: ''
        };
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleLastNameChange = (e) => {
        this.setState({
            last_name: e.target.value
        })
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value
        })
    }    

    handlePasswrodChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handlePasswrodConfirmationChange = (e) => {
        this.setState({
            password_confirmation: e.target.value
        })
    }

    handleCityChange = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    handleStateChange = (e) => {
        this.setState({
            state: e.target.value
        })
    }

    handlePhoneNumberChange = (e) => {
        this.setState({
            phone_number: e.target.value
        })
    }

    handleAddressChange = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    handleEnsuranceChange = (e) => {
        this.setState({
            ensurance_id: e.target.value
        })
    }

    handleOnSubmit = () => {
        
        this.props.register(this.state);
        
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        <div className="text-center">
                            Register
                        </div> 
                    </MDBModalHeader>
                    <MDBModalBody>
                            <form onSubmit={this.handleSubmit}>
                                <p className="h5 text-center mb-4">Sign in</p>
                                <div className="grey-text">
                                <MDBInput
                                    label="Type your name"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleNameChange(e)}
                                />
                                <MDBInput
                                    label="Type your last name"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleLastNameChange(e)}
                                />
                                <MDBInput
                                    label="Type your email"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleEmailChange(e)}
                                />
                                <MDBInput
                                    label="Type your phone number"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handlePhoneNumberChange(e)}
                                />
                                <MDBInput
                                    label="Type your address"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleAddressChange(e)}
                                />
                                <MDBInput
                                    label="Type your city"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleCityChange(e)}
                                />
                                <MDBInput
                                    label="Type your state"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleStateChange(e)}
                                />
                                <MDBInput
                                    label="Type your ensurance id"
                                    group
                                    type="email"
                                    validate
                                    error="wrong"
                                    success="right"
                                    onChange={(e) => this.handleEnsuranceChange(e)}
                                />
                                <MDBInput
                                    label="Password"
                                    group
                                    type="password"
                                    validate
                                    onChange={(e) => this.handlePasswrodChange(e)}
                                />
                                <MDBInput
                                    label="Confirm password"
                                    group
                                    type="password"
                                    validate
                                    onChange={(e) => this.handlePasswrodConfirmationChange(e)}
                                />
                                </div>
                                <div className="text-center">
                                <MDBBtn onClick = {() => this.handleOnSubmit()} >Submit</MDBBtn>
                                <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>

                                </div>
                            </form>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default connect(null, { register })(RegisterDialog);