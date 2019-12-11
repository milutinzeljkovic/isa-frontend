import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { getAllDoctors } from '../../actions/clinicAdmin';
import {getAppointmentTypes} from '../../actions/appointmentType';
import { getAllOpRooms } from '../../actions/operatingRoom';
import _ from 'loadsh';

class AvailableAppointmentsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor: '',
            facility: '',
            price: '',
            date: '',
            time: '',
            app_type: ''
        };
    }

    componentDidMount(){
        this.props.getAllDoctors();
        this.props.getAppointmentTypes();
        this.props.getAllOpRooms();
    }

    handleDoctorChange = (e) => {
        this.setState({
            doctor: e.target.value
        })
    }

    handleFacilityChange = (e) => {
        this.setState({
            facility: e.target.value
        })
    }

    handlePriceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    }    

    handleDateChange = (date) => {
        this.setState({
            date: date 
        })
    }

    handleTimeConfirmationChange = (e) => {
        this.setState({
            time: e.target.value
        })
    }

    handleAppTypeChange = (e) => {
        this.setState({
            app_type: e.target.value
        })
    }

    handleOnSubmit = () => {
        //this.props.defineAppointment(this.state);
        this.props.toggle();
    }

    renderDoctorOptions(doctors){   
        return _.map(doctors, doctor => {
          return(
            <option key={doctor.user.id} value={doctor.user.id}>{doctor.user.name} {doctor.user.last_name}</option>
          )
        })
    
    }

    renderAppTypeOptions(appointmentTypes){
        let appTypes = appointmentTypes.appointmentTypes;
        return _.map(appTypes, appointmentType => {
          return(
            <option key={appointmentType.id} value={appointmentType.id}>{appointmentType.name}</option>
          )
        })
    }

    renderOpRoomOptions(opRooms1){   
        let opRooms = opRooms1.operationRooms;
        return _.map(opRooms, opRoom => {
          return(
            <option key={opRoom.id} value={opRoom.id}>{opRoom.name}, {opRoom.number}</option>
          )
        })
    
    }
  

    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="grey-text">
                <label htmlFor="selectAppType">Choose appointment type</label>
                <select name="selectAppType" className="browser-default custom-select" onChange={(e) => this.handleAppTypeChange(e)}>
                { this.props.appointmentTypes === null ? '' : this.renderAppTypeOptions(this.props.appointmentTypes)}  
                </select>
                <label htmlFor="selectDate">Choose a date</label>
                <div style={{marginBottom:"10px"}}>
                <DateTimePicker name="selectDate" value={this.state.date} onChange={(e) => this.handleDateChange(e)}/>
                </div>
                <label htmlFor="select1">Choose facility</label>
                <select name="select1" className="browser-default custom-select" onChange={(e) => this.handleFacilityChange(e)}>
                { this.props.operatingRooms === null ? '' : this.renderOpRoomOptions(this.props.operatingRooms)}
                </select>
                <label htmlFor="select12">Choose your doctor</label>
                <select name="select12" className="browser-default custom-select" onChange={(e) => this.handleDoctorChange(e)}>
                { this.doctors === null ? '' : this.renderDoctorOptions(this.props.clinicAdmin)}
                </select>
                <MDBInput
                    label="Type the cost of the checkup"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handlePriceChange(e)}
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
                            Define new available appointment
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
        clinicAdmin: state.clinicAdmin,
        operatingRooms: state.operatingRooms,
        appointmentTypes: state.appointmentTypes
    }
}



export default connect(mapStateToProps,{getAllDoctors, getAppointmentTypes, getAllOpRooms})(AvailableAppointmentsDialog);