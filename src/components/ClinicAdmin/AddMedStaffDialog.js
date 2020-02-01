import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import {registerMedStaff} from '../../actions/clinicAdmin';
import browserHistory from '../../history';

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
            role: '',
            mondayFrom: '',
            mondayTo: '',
            tuesdayFrom: '',
            tuesdayTo: '',
            wednesdayFrom: '',
            wednesdayTo: '',
            thursdayFrom: '',
            thursdayTo: '',
            fridayFrom: '',
            fridayTo: '',
            saturdayFrom: '',
            saturdayTo: '',
            sundayFrom: '',
            sundayTo: ''
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

    handleMondayFromChange = (e) => {
        this.setState({
            mondayFrom: e.target.value
        })
    }

    handleMondayToChange = (e) => {
        this.setState({
            mondayTo: e.target.value
        })
    }

    handleTuesdayFromChange = (e) => {
        this.setState({
            tuesdayFrom: e.target.value
        })
    }

    handleTuesdayToChange = (e) => {
        this.setState({
            tuesdayTo: e.target.value
        })
    }

    handleWednesdayFromChange = (e) => {
        this.setState({
            wednesdayFrom: e.target.value
        })
    }

    handleWednesdayToChange = (e) => {
        this.setState({
            wednesdayTo: e.target.value
        })
    }

    handleThursdayFromChange = (e) => {
        this.setState({
            thursdayFrom: e.target.value
        })
    }

    handleThursdayToChange = (e) => {
        this.setState({
            thursdayTo: e.target.value
        })
    }

    handleFridayFromChange = (e) => {
        this.setState({
            fridayFrom: e.target.value
        })
    }

    handleFridayToChange = (e) => {
        this.setState({
            fridayTo: e.target.value
        })
    }

    handleSaturdayFromChange = (e) => {
        this.setState({
            saturdayFrom: e.target.value
        })
    }

    handleSaturdayToChange = (e) => {
        this.setState({
            saturdayTo: e.target.value
        })
    }

    handleSundayFromChange = (e) => {
        this.setState({
            sundayFrom: e.target.value
        })
    }

    handleSundayToChange = (e) => {
        this.setState({
            sundayTo: e.target.value
        })
    }

    handleOnSubmit = () => {
        this.props.registerMedStaff(this.state);
        this.props.toggle();
        browserHistory.push("/");
    }

    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Add medical staff to your clinic</p>
                <div className="grey-text">
                <select name="select1" className="browser-default custom-select" onChange={(e) => this.handleRoleChange(e)}>
                    <option disabled defaultValue>Choose type of medical staff</option>
                    <option value="nurse">Nurse</option>
                    <option value="doctor">Doctor</option>
                </select>
                <MDBInput
                    label="Type the name"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleNameChange(e)}
                />
                <MDBInput
                    label="Type the last name"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleLastNameChange(e)}
                />
                <MDBInput
                    label="Type their email"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleEmailChange(e)}
                />
                <MDBInput
                    label="Type their phone number"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handlePhoneNumberChange(e)}
                />
                <MDBInput
                    label="Type their address"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleAddressChange(e)}
                />
                <MDBInput
                    label="Type their city"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleCityChange(e)}
                />
                <MDBInput
                    label="Type their state"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleStateChange(e)}
                />
                <MDBInput
                    label="Type their ensurance id"
                    group
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
                <label htmlFor="hours"><span style={{fontSize:"16px", color:"black"}}><strong>Define working days and hours</strong></span></label>
                <div style={{paddingBottom:"40px"}} name="hours">
                    <label htmlFor="1">Monday</label>
                    <div className="grey-text" name="1">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleMondayFromChange(e)} type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleMondayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                    <label htmlFor="2">Tuesday</label>
                    <div className="grey-text" name="2">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleTuesdayFromChange(e)} min="0" max="24" type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleTuesdayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                    <label htmlFor="3">Wednesday</label>
                    <div className="grey-text" name="3">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleWednesdayFromChange(e)} min="0" max="24" type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleWednesdayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                    <label htmlFor="4">Thursday</label>
                    <div className="grey-text" name="4">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleThursdayFromChange(e)} min="0" max="24" type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleThursdayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                    <label htmlFor="5">Friday</label>
                    <div className="grey-text" name="5">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleFridayFromChange(e)} min="0" max="24" type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleFridayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                    <label htmlFor="6">Saturday</label>
                    <div className="grey-text" name="6">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleSaturdayFromChange(e)} min="0" max="24" type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleSaturdayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                    <label htmlFor="7">Sunday</label>
                    <div className="grey-text" name="7">
                        <input style={{width:"180px"}} placeholder="From" onChange={(e) => this.handleSundayFromChange(e)} min="0" max="24" type="number"></input>
                        <input style={{width:"180px", marginLeft:"40px"}} onChange={(e) => this.handleSundayToChange(e)} min="0" max="24" placeholder="To" type="number"></input>
                    </div>
                </div>
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