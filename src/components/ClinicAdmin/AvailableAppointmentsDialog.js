import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { getAllDoctors } from '../../actions/clinicAdmin';
import {getAppointmentTypes} from '../../actions/appointmentType';
import { getAllOpRooms } from '../../actions/operatingRoom';
import { defineAppointment } from '../../actions/appointment';
import _ from 'loadsh';

class AvailableAppointmentsDialog extends Component {

    constructor(props) {
        super(props);
        let datum = '';
        this.state = {
            doctor: '',
            operations_rooms_id: '',
            price: '',
            date: '',
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
            operations_rooms_id: e.target.value
        })
    }

    handlePriceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    }    

    handleDateChange = (date1) => {
        this.datum = date1;
        let datum2 = date1.toISOString().split('.')[0];
        let datum1 = datum2.replace('T',' ');
        this.setState({
            date: datum1
        })
    }

    handleAppTypeChange = (e) => {
        this.setState({
            app_type: e.target.value
        })
    }

    handleOnSubmit = () => {
        const datas = {...this.state};
        console.log(datas);

        this.props.defineAppointment(datas);
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
        let opRooms = opRooms1.operatingRooms;
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
                <DateTimePicker format='yyyy-MM-dd HH:mm:ss' value = { this.datum } name="selectDate" onChange={(e) => this.handleDateChange(e)}/>
                </div>
                <label htmlFor="select1">Choose facility</label>
                <select name="select1" className="browser-default custom-select" onChange={(e) => this.handleFacilityChange(e)}>
                { this.props.operatingRooms === null ? '' : this.renderOpRoomOptions(this.props.operatingRooms)}
                </select>
                <label htmlFor="select12">Choose your doctor</label>
                <select name="select12" className="browser-default custom-select" onChange={(e) => this.handleDoctorChange(e)}>
                { this.props.clinicAdmin === null ? '' : this.renderDoctorOptions(this.props.clinicAdmin)}
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



export default connect(mapStateToProps,{getAllDoctors, getAppointmentTypes, getAllOpRooms, defineAppointment})(AvailableAppointmentsDialog);