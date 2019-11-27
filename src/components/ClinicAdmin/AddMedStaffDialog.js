import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import {registerMedStaff} from '../../actions/clinicAdmin';

class AddMedStaffDialog extends Component {

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
            password_confirmation: '',
            role: 'nurse'
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

    handleRoleChange = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    handleOnSubmit = () => {
        console.log(this.props.auth.currentUser.userable_type);
        this.props.registerMedStaff(this.state);
        this.props.toggle();
    }

    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Add medical staff to your clinic</p>
                <div className="grey-text">
                <label htmlFor="select1">Choose medical staff role</label>
                <select name="select1" className="browser-default custom-select" onChange={(e) => this.handleRoleChange(e)}>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                </select>
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
                <MDBBtn onClick = {() => this.handleOnSubmit()} >Add</MDBBtn>
                <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>
                </div>
            </form>
        )
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        <div className="text-center">
                            Add medical staff
                        </div> 
                    </MDBModalHeader>
                    <MDBModalBody>
                            {this.renderModalBodyContent()}
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state)=> {
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps, { registerMedStaff })(AddMedStaffDialog);