import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, } from 'mdbreact';
import { connect } from 'react-redux';
import {registerClinicAdmin} from '../../actions/auth';

import LocationDialog from '../Location/LocationDialog';

class AddClinicAdminDialog extends Component{
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
        };
    }

    handleOnSubmit = (e) => {
        let address = this.props.usersAddress;
        const arr = address.split(',');
        console.log(address);
        
        const datas = {...this.state,city:arr[1],address: arr[0],state: arr[2]};
        
        this.props.registerClinicAdmin(datas, this.props.id);
        
        this.props.toggle()
        
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

    renderModalBodyContent = () => {
            return(
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
                    <LocationDialog/>
                    </div>
                    <div className="text-center">
                    <MDBBtn onClick = {() => this.handleOnSubmit()} >Submit</MDBBtn>
                    <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>

                    </div>
                </form>
            )
        
    }
    

    render(){
        return (
            <MDBContainer>
                <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        <div className="text-center">
                            Register clinic admin
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
        usersAddress: state.selectedLocation === null ? '':  state.selectedLocation.usersLocation
    }
}

export default connect(mapStateToProps, { registerClinicAdmin })(AddClinicAdminDialog);