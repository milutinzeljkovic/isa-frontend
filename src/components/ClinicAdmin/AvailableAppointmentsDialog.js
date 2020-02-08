import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { getClinicDoctors, getDoctorsByAppType } from '../../actions/clinicAdmin';
import {getAppointmentTypesClinic} from '../../actions/appointmentType';
import { getAllOpRooms } from '../../actions/operatingRoom';
import { defineAppointment } from '../../actions/appointment';
import browserHistory from '../../history';
import _ from 'loadsh';

class AvailableAppointmentsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            status: null,
            doctor: '',
            operations_room_id: '',
            price: '',
            date: '',
            app_type: '',
            duration: ''
        };
    }

    async componentDidMount(){
        await this.props.getClinicDoctors();
        await this.props.getAppointmentTypesClinic();        
        this.props.getAllOpRooms();
    }

    handleDoctorChange = (e) => {                
        this.setState({
            doctor: e.target.value
        })
    }

    handleFacilityChange = (e) => {
        this.setState({
            operations_room_id: e.target.value
        })
    }

    handlePriceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    }    

    handleDurationChange = e => {
        this.setState({
            duration: e.target.value
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

    handleAppTypeChange = async e => {
        this.setState({
            app_type: e.target.value
        })
        await this.props.getDoctorsByAppType(e.target.value);
    }

    handleOnSubmit = async () => {
        const datas = {...this.state};  
        let res;      
        try{
            res = await this.props.defineAppointment(datas);            
        }catch(e){
            this.setState({
                error: true
            })
            
        }
        try{
            if(res.status !== 200){            
                this.setState({
                    status: res.data.created ? res.data.created : res.data
                })
            }
        }catch(e){
            
        }
        if(res.data.created){
            setTimeout(()=>this.close(),1000);
        }

    }

    close = () => {
        this.props.toggle();
        browserHistory.push("/");
    }

    renderDoctorOptions(doctors){   
        return _.map(doctors, doctor => {
          return(
            <option key={doctor.user.id} value={doctor.id}
                onClick = {() => this.handleDoctorChange(doctor.id)}
            >
                {doctor.user.name} {doctor.user.last_name}
            </option>
          )
        })
    }

    renderAppTypeOptions(appointmentTypes){
        let appTypes = appointmentTypes;
        return _.map(appTypes, appointmentType => {            
          return(
            <option key={appointmentType.id} value={appointmentType.id}
                onClick={()=>this.handleAppTypeChange(appointmentType.id)}
            >
                {appointmentType.name}
            </option>
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
    resetState = () => {
        this.setState({
            status: null
        })
    }  

    renderModalBodyContent = () => {        
        if(this.state.error === true){
            return(
                <div>
                    <p>Error when creating appointment <a href onClick = {this.resetState}>click here to try again</a></p>
                </div>
            )
        }else{
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="grey-text">
                <label htmlFor="selectAppType">Choose appointment type</label>
                <select name="selectAppType" className="browser-default custom-select" onChange={(e) => this.handleAppTypeChange(e)}>
                <option disabled selected defaultValue>Select a appointment type</option>
                { this.props.appointmentTypes === null ? '' : this.renderAppTypeOptions(this.props.appointmentTypes)}  
                </select>
                <label htmlFor="selectDate">Choose a date</label>
                <div style={{marginBottom:"10px"}}>
                <DateTimePicker format='yyyy-MM-dd HH:mm:ss' value = { this.datum } name="selectDate" onChange={(e) => this.handleDateChange(e)}/>
                </div>
                <label htmlFor="select1">Choose facility</label>
                <select name="select1" className="browser-default custom-select" onChange={(e) => this.handleFacilityChange(e)}>
                <option disabled selected defaultValue>Select a operating room</option>
                { this.props.operatingRooms === null ? '' : this.renderOpRoomOptions(this.props.operatingRooms)}
                </select>
                <label htmlFor="select12">Choose your doctor</label>
                <select name="select12" className="browser-default custom-select" onChange = {(e) => this.handleDoctorChange(e)}>
                <option disabled  selected defaultValue>Select a doctor</option>
                { this.props.clinicAdmin === null || this.props.clinicAdmin.clinicDoctors===undefined? '' : this.renderDoctorOptions(this.props.clinicAdmin.clinicDoctors)}
                </select>
                <MDBInput
                    label="Type the cost of the checkup"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handlePriceChange(e)}
                />
                <MDBInput
                    label="Duration"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleDurationChange(e)}
                />
                </div>
                <div className="text-center">
                <MDBBtn onClick = {() => this.handleOnSubmit()} >Add</MDBBtn>
                <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>
                </div>
            </form>
        )
        }
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
                            {this.state.status !== null ? <p  style ={{color:"red"}} >{this.state.status}</p> : ""}
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
        appointmentTypes: state.appointmentTypes === null ? null : state.appointmentTypes.clinicAppointmentTypes,
        clinicDoctors: state.clinicAdmin === null ? null : state.clinicAdmin.clinicDoctors
    }
}



export default connect(mapStateToProps,{getClinicDoctors, getDoctorsByAppType, getAppointmentTypesClinic, getAllOpRooms, defineAppointment})(AvailableAppointmentsDialog);