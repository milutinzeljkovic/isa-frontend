import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBCollapse, MDBBtn, MDBRow, MDBInput, MDBCardBody, MDBCard } from 'mdbreact';

import { connect } from 'react-redux';
import { getAllDoctors, setEntityToBeUpdated, seeIfBookedDoctor, deleteDoctor } from '../../actions/clinicAdmin';
import { getAppointmentTypesClinic, deleteAppointmentType, seeIfUsedAppType, getDoctorsOptionsAppTypes } from '../../actions/appointmentType';
import { getAllOpRooms, seeIfBookedOpRoom, deleteOperatingRoom, searchOperatingRooms, setOperatingRoomCalendar } from '../../actions/operatingRoom';
import { getDoctorsWorkingHours } from '../../actions/workingHours';
import { reserveAppointment } from '../../actions/clinicAdmin';
import { reserveOperation } from '../../actions/clinicAdmin';

import _ from 'loadsh';
import FeedbackNotification from '../FeedbackNotification';
import browserHistory from '../../history';
import DatePicker from "react-datepicker";


class AdminOptionPage extends Component {

    constructor(props) {
        super(props);
        const date = new Date();
        const m = date.getMonth() + 1;
        let c = date.getFullYear() + '-' + m + '-' + date.getDate();
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 500);
        this.debouncedOnChangeNumber = _.debounce(this.debouncedOnChangeNumber.bind(this), 500);
        this.state = {
            showNotification: false,
            notificationMessage: '',
            collapseID: false,
            dateSelected: c,
            name: '',
            number: '',
            enteredDate: false,
            reserved: false,
            app: null
        }
    }

    toggleCollapse = collapseID => () => {
        this.setState({
            collapseID: !this.state.collapseID
        });
    }

    componentWillMount() {
        if (this.props.mode === 'Doctor mode') {
            this.props.getAllDoctors();
        } else if (this.props.mode === 'App type mode') {
            this.props.getAppointmentTypesClinic();
        } else if (this.props.mode === 'Op room mode') {
            this.props.getAllOpRooms();
        }
    }

    handleNameChange = event => {
        this.setState({ name: event.target.value });
        this.debouncedOnChange(event.target.value);
    }

    debouncedOnChange(value) {
        this.searchByName(value);
    }

    searchByName = value => {
        let params = { name: value, number: this.state.number, date: null };
        if (this.state.enteredDate === true) {
            params.date = this.state.dateSelected;
        }
        this.props.searchOperatingRooms(params);
    }

    handleNumberChange = event => {
        this.setState({ number: event.target.value });
        this.debouncedOnChangeNumber(event.target.value);
    }

    debouncedOnChangeNumber(value) {
        this.searchByNumber(value);
    }

    searchByNumber = value => {
        let params = { name: this.state.name, number: value, date: null };
        if (this.state.enteredDate === true) {
            params.date = this.state.dateSelected;
        }
        this.props.searchOperatingRooms(params);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    handleDateChange = async date => {

        const d = new Date(date.getTime());
        let formatted_date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

        if (formatted_date === this.state.dateSelected) {

            await this.setStateAsync({
                dateSelected: null,
                enteredDate: false
            })
        } else {
            await this.setStateAsync({
                dateSelected: formatted_date,
                enteredDate: true
            })
        }

        let params = { name: this.state.name, number: this.state.number, date: this.state.dateSelected };
        this.props.searchOperatingRooms(params);

    };

    updateDoctor = async (doctor) => {
        await this.props.setEntityToBeUpdated(doctor);
        await this.props.seeIfBookedDoctor(doctor.id);
        await this.props.getDoctorsWorkingHours(doctor.id);
        await this.props.getDoctorsOptionsAppTypes(doctor.id)
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

    reserveRoom = async opRoom => {
        let res = await this.props.reserveAppointment(opRoom.id, this.props.requestedAppointment.id);
        console.log(res);

        this.setState({
            reserved: true,
            app: res.payload
        })
    }

    reserveRoomForOperation = async opRoom => {
        let res = await this.props.reserveOperation(opRoom.id, this.props.requestedOperation.id);

        this.setState({
            reserved: true,
            app: res.payload
        })
    }

    timeExit() {
        setTimeout(
            function () {
                this.setState({ showNotification: !this.state.showNotification });
            }.bind(this), 3000);
    }

    deleteDoctor = async (doctorId, name) => {
        await this.props.seeIfBookedDoctor(doctorId);
        if (this.props.update.updatable[0] === "true") {
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'Doctor ' + name + ' is not available for deleting because he is booked in an appointment'
            })
            this.timeExit();
        } else {
            this.props.deleteDoctor(doctorId);
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'Doctor ' + name + ' has been successfully deleted'
            })
            this.timeExit();
        }
        window.location.reload();
    }

    deleteOperatingRoom = async (opRoomId, opRoomNumber) => {
        await this.props.seeIfBookedOpRoom(opRoomId);
        if (this.props.update.updatable[0] === "true") {
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'Operating room number ' + opRoomNumber + ' is not available for deleting because it is being used in an appointment'
            })
            this.timeExit();
        } else {
            this.props.deleteOperatingRoom(opRoomId);
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'You have successfully deleted this operating room'
            })
            this.timeExit();
        }
        window.location.reload();
    }

    deleteAppType = async (appTypeId) => {
        await this.props.seeIfUsedAppType(appTypeId);
        if (this.props.update.updatable[0] === "true") {
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'This appointment type is not available for deleting because it is being used in an appointment'
            })
            this.timeExit();
        }else {
            await this.props.deleteAppointmentType(appTypeId);
            this.setState({
                showNotification: !this.state.showNotification,
                notificationMessage: 'You have successfully deleted this appointment type'
            })
        }
        window.location.reload();
    }

    seeAvailabilityCalendar = async opRoom => {
        await this.props.setOperatingRoomCalendar(opRoom);
        browserHistory.push('/operating-room/calendar');
    }

    renderDoctorList = (doctors) => {

        return _.map(doctors, doctor => {
            return (
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
        let appTypes = appointmentTypes.clinicAppointmentTypes;

        return _.map(appTypes, appointmentType => {
            return (
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
            return (
                <tr key={opRoom.id}>
                    <td>{opRoom.name}</td>
                    <td>{opRoom.number}</td>
                    <td>
                        <MDBBtn color="danger" onClick={() => this.deleteOperatingRoom(opRoom.id, opRoom.number)}>Delete</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn color="primary" onClick={() => this.updateOperatingRoom(opRoom)}>Update</MDBBtn>
                    </td>
                    <td>
                        <MDBBtn color="info" onClick={() => this.seeAvailabilityCalendar(opRoom)}>Availability</MDBBtn>
                    </td>
                    {
                        this.props.operatingRooms.appointment === undefined ?
                            ""
                            :
                            <td>
                                <MDBBtn dusk='reserveR' color="danger" onClick={() => this.reserveRoom(opRoom)}>Reserve for appointment</MDBBtn>
                            </td>
                    }

                    {
                        this.props.operatingRooms.operation === undefined ?
                            ""
                            :
                            <td>
                                <MDBBtn color="info" outline onClick={() => this.reserveRoomForOperation(opRoom)}>Reserve for operation</MDBBtn>
                            </td>
                    }
                </tr>
            )
        })
    }

    renderTableBody = () => {
        if (this.props.mode === 'Doctor mode') {
            return (
                this.props.clinicAdmin === null ? '' : this.renderDoctorList(this.props.clinicAdmin)
            )
        } else if (this.props.mode === 'App type mode') {
            return (
                this.props.appointmentTypes === null ? '' : this.renderAppointmentTypeList(this.props.appointmentTypes)
            )
        } else if (this.props.mode === 'Op room mode') {
            return (
                this.props.operatingRooms === null ? '' : this.renderOperatingRoomList(this.props.operatingRooms)
            )
        }
    }

    renderTableHead = () => {
        if (this.props.mode === 'Doctor mode') {
            return (
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
        } else if (this.props.mode === 'App type mode') {
            return (
                <tr>
                    <th>Name</th>
                    <th>Delete</th>
                    <th>Update</th>
                </tr>
            )
        } else if (this.props.mode === 'Op room mode') {
            return (
                <tr>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Delete</th>
                    <th>Update</th>
                    <th>See availability</th>
                    {
                        this.props.operatingRooms === null || this.props.operatingRooms.appointment === undefined ?
                            ""
                            :
                            <td>

                            </td>
                    }
                       {
                        this.props.operatingRooms === null || this.props.operatingRooms.operation === undefined ?
                            ""
                            :
                            <td>

                            </td>
                    }
                </tr>
            )
        }
    }

    renderSearchBar = () => {
        return (
            <div>
                <MDBRow>
                    <MDBBtn color="primary" style={{ marginLeft: '35px' }} onClick={this.toggleCollapse("basicCollapse1")}><span style={{ color: 'white' }}>Search</span></MDBBtn>
                </MDBRow>
                <>
                    <MDBRow>
                        <MDBCollapse id="basicCollapse1" isOpen={this.state.collapseID}>
                            <div style={{ width: '200px', marginLeft: '35px' }}>
                                <MDBInput
                                    label="Name"
                                    group
                                    onChange={(e) => this.handleNameChange(e)}>

                                </MDBInput>
                                <MDBInput
                                    label="Number"
                                    group
                                    onChange={(e) => this.handleNumberChange(e)}>

                                </MDBInput>
                                <label htmlFor="picker">
                                    Date
                            </label>
                                <DatePicker
                                    name="picker"
                                    value={this.state.dateSelected === null ? '' : this.state.dateSelected}
                                    onChange={(date) => this.handleDateChange(date)}
                                    minDate={new Date()}
                                >
                                </DatePicker>
                            </div>
                        </MDBCollapse>
                    </MDBRow>
                </>
            </div>
        )
    }
    goBack = () => {
        browserHistory.push('/pending-appointment-requests');

    }
    goBack1 = () => {
        browserHistory.push('/operations-requests');

    }

    tryAgain = () => {
        this.setState({
            app: null,
            reserved: false

        })
    }


    render() {
        if (this.state.reserved) {
            return (
                <div className='container' style={{ paddingTop: '50px' }}>
                    <MDBCard>
                        <MDBCardBody>
                            {this.state.app.error !== undefined ?
                                <p>{this.state.app.error.message}<a href onClick={this.tryAgain}> try again</a> </p>
                                :
                                <div>
                                    {this.props.operatingRooms.operation=== undefined?  <p>
                                        Appointment reserved
                                    <MDBBtn color="info" onClick={this.goBack}>Back</MDBBtn>
                                    </p>:  <p>
                                        Operating room reserved
                                    <MDBBtn color="info" onClick={this.goBack1}>Back</MDBBtn>
                                    </p>}
                                 
                                </div>
                            }
                        </MDBCardBody>
                    </MDBCard>
                </div>)

        } else {
            return (
                <div className='container' style={{ paddingTop: '50px' }}>
                    <MDBTable hover>
                        <MDBTableHead color="info-color" textWhite>
                            {this.renderTableHead()}
                        </MDBTableHead>
                        <MDBTableBody>
                            {this.renderTableBody()}
                        </MDBTableBody>
                    </MDBTable>
                    <MDBRow>
                        {this.props.mode === 'Op room mode' ? this.renderSearchBar() : ''}
                    </MDBRow>

                    {this.state.showNotification === true ? <FeedbackNotification show={this.state.showNotification} notificationMessage={this.state.notificationMessage} /> : ''}
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        clinicAdmin: state.clinicAdmin,
        operatingRooms: state.operatingRooms,
        appointmentTypes: state.appointmentTypes,
        update: state.update,
        requestedAppointment: state.operatingRooms === null ? null : state.operatingRooms.appointment,
        reservedAppointment: state.appointments === null ? null : state.appointments.appointmentReserved,
        requestedOperation: state.operatingRooms === null ? null : state.operatingRooms.operation
    }
  }
  
  export default connect(mapStateToProps, {reserveOperation,getDoctorsOptionsAppTypes, reserveAppointment, getAllDoctors, getAllOpRooms, getAppointmentTypesClinic, deleteAppointmentType, getDoctorsWorkingHours, seeIfBookedOpRoom,  seeIfBookedDoctor, seeIfUsedAppType, setEntityToBeUpdated, deleteOperatingRoom, deleteDoctor, searchOperatingRooms, setOperatingRoomCalendar})(AdminOptionPage);
