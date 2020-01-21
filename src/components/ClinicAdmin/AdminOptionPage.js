import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBNotification } from 'mdbreact';
import { connect } from 'react-redux';
import { getAllDoctors, /*deleteDoctor*/ } from '../../actions/clinicAdmin';
import {getAppointmentTypes, deleteAppointmentType} from '../../actions/appointmentType';
import { getAllOpRooms, /*deleteOperatingRoom*/} from '../../actions/operatingRoom';
import _ from 'loadsh';
import FeedbackNotification from '../FeedbackNotification';

class AdminOptionPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            showNotification: false,
            notificationMessage: '',
            notificationColor: 'red'
        }
    }

    componentWillMount(){
        if(this.props.mode === 'Doctors mode'){
            this.props.getAllDoctors();
        }else if(this.props.mode === 'App type mode'){
            this.props.getAppointmentTypes();
        }else if(this.props.mode === 'Op room mode'){
            this.props.getAllOpRooms();
        }
    }

    deleteAppType = (appTypeId) => {
        this.setState({
            showNotification: !this.state.showNotification,
            notificationMessage: 'proba',
            notificationColor: 'green'
        });

        this.timeExit();
        //this.props.deleteAppointmentType(appTypeId);
    }

    timeExit(){
        setTimeout(
            function() {
                this.setState({showNotification: !this.state.showNotification,});
            }
            .bind(this),
            3000
        );
    }

    deleteDoctor = (doctorId) =>{
        this.props.deleteDoctor(doctorId);
    }

    deleteOperatingRoom = (opRoomId) =>{
        this.props.deleteOperatingRoom(opRoomId);
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
                    <MDBBtn color="primary" onClick={() => this.deleteDoctor(doctor.user.id)}>Delete</MDBBtn>
                </td>
                <td>
                    <MDBBtn color="primary">Update</MDBBtn>
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
                  <MDBBtn color="primary" onClick={() => this.deleteAppType(appointmentType.id)}>Delete</MDBBtn>
                </td>
                <td>
                  <MDBBtn color="primary">Update</MDBBtn>
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
                  <MDBBtn color="primary" onClick={() => this.deleteDoctor(opRoom.id)}>Delete</MDBBtn>
                </td>
                <td>
                  <MDBBtn color="primary">Update</MDBBtn>
                </td>
            </tr>
          )
        })
    }

    renderTableBody = () => {
        if(this.props.mode === 'Doctor mode'){
            return(
                <MDBTableBody>
                    { this.props.clinicAdmin === null ? '' : this.renderDoctorList(this.props.clinicAdmin)}
                </MDBTableBody> 
            )
        }else if(this.props.mode === 'App type mode'){
            return(
                <MDBTableBody>
                    { this.props.appointmentTypes === null ? '' : this.renderAppointmentTypeList(this.props.appointmentTypes)}
                </MDBTableBody> 
            )
        }else if(this.props.mode === 'Op room mode'){
            return(
                <MDBTableBody>
                    { this.props.operatingRooms === null ? '' : this.renderOperatingRoomList(this.props.operatingRooms)}
                </MDBTableBody> 
            )
        }else {
            return(
                <MDBTableBody> </MDBTableBody> 
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
                <MDBTable>
                    <MDBTableHead color="info-color" textWhite>
                        {this.renderTableHead()}
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderTableBody()}
                    </MDBTableBody>
                </MDBTable>

                {this.state.showNotification === true ? <FeedbackNotification show={this.state.showNotification} showNotification={this.state.showNotification} notificationColor={this.state.notificationColor} notificationMessage={this.state.notificationMessage}/> : ''}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      clinicAdmin: state.clinicAdmin,
      operatingRooms: state.operatingRooms,
      appointmentTypes: state.appointmentTypes
    }
  }
  
  export default connect(mapStateToProps, {getAllDoctors, getAllOpRooms, getAppointmentTypes, deleteAppointmentType/*, deleteDoctor, deleteOperatingRoom*/})(AdminOptionPage);