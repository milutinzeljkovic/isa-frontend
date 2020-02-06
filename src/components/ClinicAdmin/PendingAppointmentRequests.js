import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPendingRequests, reserveRoom } from "../../actions/clinicAdmin";
import { MDBTable, MDBTableBody, MDBTableHead,  MDBBtn,   MDBCard, MDBCardBody } from 'mdbreact';
import browserHistory from '../../history';

import _ from 'loadsh';

class PendingAppointmentRequests extends Component {

    constructor(props){
        super(props);
        this.state = {
            appointment: null
        }
    }

    async componentWillMount(){
       await this.props.getPendingRequests();
    }

    settings = app =>{
        this.setState({
            appointment: app
        })
        
    }

    decline = app => {

    }

    addRoom = () => {
        this.props.reserveRoom(this.state.appointment);
        browserHistory.push('/clinic-admin/all-operating-rooms');
        
    }

    renderRequests = appointments => {
        return _.map(appointments, app=>{
            return(
                <tr>
                    <td>{app.date}</td>
                    <td>{app.patient.user.name}</td>
                    <td>{app.doctor.user.name}</td>
                    <td><MDBBtn onClick = {() => this.settings(app)}>Accept</MDBBtn></td>
                    <td><MDBBtn color="orange" onClick = {() => this.decline(app)}>Decline</MDBBtn></td>
                </tr>
            )
        })
    }

    renderSettings = (appointment) => {
        return(
            <MDBCard style ={{"margin-top": "2%"}}>
                <MDBCardBody>
                    <MDBTable>
                    <MDBTableHead color="blue" textWhite>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <td>doctor name:</td>
                                <td><h5>{appointment.doctor.user.name}</h5></td>
                            </tr>
                            <tr>
                                <td>doctor last name:</td>
                                <td><h5>{appointment.doctor.user.last_name}</h5></td>
                            </tr>
                            <tr>
                                <td>doctor email:</td>
                                <td><h5>{appointment.doctor.user.email}</h5></td>
                            </tr>
                            <tr>
                                <td>patient name:</td>
                                <td><h5>{appointment.patient.user.name}</h5></td>
                            </tr>
                            <tr>
                                <td>patient last name:</td>
                                <td><h5>{appointment.patient.user.last_name}</h5></td>
                            </tr>
                            <tr>
                                <td>patient email:</td>
                                <td><h5>{appointment.patient.user.email}</h5></td>
                            </tr>
                            <tr>
                                <td>appointment date:</td>
                                <td><h5>{appointment.date}</h5></td>
                            </tr>
                            <tr>
                                <td><MDBBtn onClick = {() => this.addRoom()}>Add room</MDBBtn></td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        )
    }

    render() {
        return (
            <div className = 'container'>
                <MDBCard>
                <MDBCardBody>

                <MDBTable >
                <MDBTableHead color="blue" textWhite>
                        <tr>
                            <td>date</td>
                            <td>patient name</td>
                            <td>doctor name</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        {this.renderRequests(this.props.pending)}
                    </MDBTableBody>
                </MDBTable>
                </MDBCardBody>

                </MDBCard>
                {this.state.appointment === null ? "" : this.renderSettings(this.state.appointment)}
                
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        pending: state.appointments !== null ? state.appointments.pending : null
    }
}

export default connect(mapStateToProps,{getPendingRequests, reserveRoom})(PendingAppointmentRequests);