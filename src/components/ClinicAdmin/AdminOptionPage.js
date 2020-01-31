import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { getAllDoctors, setEntityToBeUpdated, seeIfBookedDoctor, deleteDoctor } from '../../actions/clinicAdmin';
import { getAppointmentTypes, deleteAppointmentType, seeIfUsedAppType } from '../../actions/appointmentType';
import { getAllOpRooms, seeIfBookedOpRoom, deleteOperatingRoom } from '../../actions/operatingRoom';
import { getDoctorsWorkingHours } from '../../actions/workingHours';
import _ from 'loadsh';
import FeedbackNotification from '../FeedbackNotification';
import browserHistory from '../../history';

class AdminOptionPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            showNotification: false,
            notificationMessage: ''
        }
    }

    componentWillMount(){
        if(this.props.mode === 'Doctor mode'){
            this.props.getAllDoctors();
        }else if(this.props.mode === 'App type mode'){
            this.props.getAppointmentTypes();
        }else if(this.props.mode === 'Op room mode'){
            this.props.getAllOpRooms();
        }
    }
    
    updateDoctor = async (doctor) => {
        await this.props.setEntityToBeUpdated(doctor);
        await this.props.seeIfBookedDoctor(doctor.id);
        await this.props.getDoctorsWorkingHours(doctor.id);
        browserHistory.push("/clinic-admin/update-doctor");
    }

    updateOperatingRoom = async (opRoom) => {
        await this.props.setEntityToBeUpdated(opRoom);
        await this.props.seeIfBookedOpRoom(opRoom.id);
        browserHistory.push("/clinic-admin/update-operating-rooms");
    }

    updateAppointmentType = async (appType) => {
        await this.props.setEntityToBeUpdated(appType);
        await this.props.seeIfUsedAppType(appType.id);
        browserHistory.push("/clinic-admin/update-appointment-types");
    }

    timeExit(){
        setTimeout(
            function() {
                this.setState({showNotification: !this.state.showNotification});
            }.bind(this),3000);
    }

    deleteDoctor = async (doctorId, name) =>{
        await this.props.seeIfBookedDoctor(doctorId);
        if(this.props.update.updatable[0] === "true"){
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'Doctor ' + name + ' is not available for deleting because he is booked in an appointment'
            })
            this.timeExit();
        }else {
            this.props.deleteDoctor(doctorId);
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'Doctor ' + name + ' has been successfully deleted'
            })
            this.timeExit();
        }
    }

    deleteOperatingRoom = async (opRoomId, opRoomNumber) =>{
        await this.props.seeIfBookedOpRoom(opRoomId);
        if(this.props.update.updatable[0] === "true"){
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'Operating room number ' + opRoomNumber + ' is not available for deleting because it is being used in an appointment'
            })
            this.timeExit();
        }else {
            this.props.deleteOperatingRoom(opRoomId);
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'You have successfully deleted this operating room'
            })
            this.timeExit();
        }
        
    }

    deleteAppType = async (appTypeId) => {
        await this.props.seeIfUsedAppType(appTypeId);
        if(this.props.update.updatable[0] === "true"){
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'This appointment type is not available for deleting because it is being used in an appointment'
            })
            this.timeExit();
        }else {
            this.props.deleteAppointmentType(appTypeId);
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'You have successfully deleted this appointment type'
            })
            this.timeExit();
        }
    }

    renderDoctorList= (doctors) =>{ 

        return _.map(doctors, doctor => {
          return(
            <tr key={doctor.user.id}>
                <td>{doctor.user.name}</td>
                <td>{doctor.user.last_name}</td>
                <td>{doctor.user.email}</td>
                <td>{doctor.user.city}</td>
                <td>{doctor.user.address}</td>
                <td>{doctor.user.phone_number}</td>
                <td>
                    <MDBBtn color="danger" onClick={() => this.deleteDoctor(doctor.user.id, doctor.user.name)}>Delete</MDBBtn>
                </td>
                <td>
                    <MDBBtn color="primary" onClick={() => this.updateDoctor(doctor.user)}>Update</MDBBtn>
                </td>
            </tr>
          )
        })
    }

    renderAppointmentTypeList = (appointmentTypes) => { 
        let appTypes = appointmentTypes.appointmentTypes;

        return _.map(appTypes, appointmentType => {
          return(
            <tr key={appointmentType.id}>
                <td>{appointmentType.name}</td>
                <td>
                  <MDBBtn color="danger" onClick={() => this.deleteAppType(appointmentType.id)}>Delete</MDBBtn>
                </td>
                <td>
                  <MDBBtn color="primary" onClick={() => this.updateAppointmentType(appointmentType)}>Update</MDBBtn>
                </td>
            </tr>
          )
        })
    }

    renderOperatingRoomList = (opRooms1) => { 
        let opRooms = opRooms1.operatingRooms;

        return _.map(opRooms, opRoom => {
          return(
            <tr key={opRoom.id}>
                <td>{opRoom.name}</td>
                <td>{opRoom.number}</td>
                <td>
                  <MDBBtn color="danger" onClick={() => this.deleteOperatingRoom(opRoom.id, opRoom.number)}>Delete</MDBBtn>
                </td>
                <td>
                  <MDBBtn color="primary" onClick={() => this.updateOperatingRoom(opRoom)}>Update</MDBBtn>
                </td>
            </tr>
          )
        })
    }

    renderTableBody = () => {
        if(this.props.mode === 'Doctor mode'){
            return(
                this.props.clinicAdmin === null ? '' : this.renderDoctorList(this.props.clinicAdmin)
            )
        }else if(this.props.mode === 'App type mode'){
            return(
                this.props.appointmentTypes === null ? '' : this.renderAppointmentTypeList(this.props.appointmentTypes)
            )
        }else if(this.props.mode === 'Op room mode'){
            return(
                this.props.operatingRooms === null ? '' : this.renderOperatingRoomList(this.props.operatingRooms)
            )
        }
    }

    renderTableHead = () => {
        if(this.props.mode === 'Doctor mode'){
            return(
                <tr>
                    <th>Name</th>
                    <th>Last name</th>
                    <th>E-mail</th>
                    <th>City</th>
                    <th>Adress</th>
                    <th>Phone number</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            )
        }else if(this.props.mode === 'App type mode'){
            return(
                <tr>
                    <th>Name</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            )
        }else if(this.props.mode === 'Op room mode'){
            return(
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            )
        }
    }


    render(){
        return(
            <div className='container' style={{paddingTop:'50px'}}>
                <MDBTable hover>
                    <MDBTableHead color="info-color" textWhite>
                        {this.renderTableHead()}
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderTableBody()}
                    </MDBTableBody>
                </MDBTable>

                {this.state.showNotification === true ? <FeedbackNotification show={this.state.showNotification} notificationMessage={this.state.notificationMessage}/> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      clinicAdmin: state.clinicAdmin,
      operatingRooms: state.operatingRooms,
      appointmentTypes: state.appointmentTypes,
      update: state.update
    }
  }
  
  export default connect(mapStateToProps, {getAllDoctors, getAllOpRooms, getAppointmentTypes, deleteAppointmentType, getDoctorsWorkingHours, seeIfBookedOpRoom,  seeIfBookedDoctor, seeIfUsedAppType, setEntityToBeUpdated, deleteOperatingRoom, deleteDoctor})(AdminOptionPage);