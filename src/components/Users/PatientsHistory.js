import React, { Component } from 'react';
import { MDBListGroupItem, MDBBadge } from "mdbreact";

import _ from 'loadsh';

class PatientsHistory extends Component {

    constructor(props){
        super(props);
        this.state= {
            sortByDate: false,
            sortByName: false,
            sortByAppointment: false,
            appointments: this.props.appointments,
            dateDesc: true,
            doctorDesc: true,
            appDesc: true
        }

    }


    renderHistory = appointments => {
        return _.map(appointments, appointment => {            
            return(
                <MDBListGroupItem 
                    key = {appointment.id}
                >   
                <table>
                    <tbody>
                    <tr>
                        <td><i className="fas fa-user-md"></i></td>
                        <td><h5 className="mb-1">{appointment.doctor.user.name} {appointment.doctor.user.email}</h5></td>
                    </tr>
                    <tr>
                        <td><i className="fas fa-clinic-medical"></i></td>
                        <td><h5 className="mb-1">{appointment.clinic.name}</h5></td>                        
                    </tr>
                    <tr>
                        <td><i className="fas fa-map-marker-alt"></i></td>
                        <td><h5 className="mb-1"> {appointment.clinic.address}</h5></td>
                    </tr>
                    <tr>
                        <td><i className="far fa-calendar-check"></i>i</td>
                        <td><h5 className="mb-1">{appointment.date}</h5></td>
                    </tr>

                    <tr>
                        <td><i className="fas fa-info"></i></td>
                        <td><h5 className="mb-1">{appointment.appointment_type.name}</h5></td>
                    </tr>
                    <tr>
                        <td><i className="fas fa-hospital-symbol"></i></td>
                        <td><h5 className="mb-1">{appointment.operations_room.name} {appointment.operations_room.number}</h5></td>
                    </tr>
                    </tbody>
                </table>
                </MDBListGroupItem>
            )
        })
    }

    sort = type => {
        let desDate = this.state.dateDesc;
        let desDoc = this.state.doctorDesc;
        let desApp = this.state.appDesc;

        switch(type) {
            case 'date':
                const newState = this.state.appointments.sort(function(a, b) {
                    a = new Date(a.date);
                    b = new Date(b.date);
                    return desDate === true ? (a>b ? -1 : a<b ? 1 : 0) : (a<b ? -1 : a<b ? 1 : 0) 
                });
                this.setState({
                    appointments: newState,
                    dateDesc: !this.state.dateDesc
                })
                break;
            case 'doctor':
                const newDoct = this.state.appointments.sort(function(a, b) {
                    a = a.doctor.user.name;
                    b = b.doctor.user.name;
                    return desDoc === true ? (a>b ? -1 : a<b ? 1 : 0) : (a<b ? -1 : a<b ? 1 : 0) 
                });
                this.setState({
                    appointments: newDoct,
                    doctorDesc: !this.state.doctorDesc
                })
                break;
            case 'type':
                const newApp = this.state.appointments.sort(function(a, b) {
                    a = a.appointment_type.name
                    b = b.appointment_type.name
                    return desApp === true ? (a>b ? -1 : a<b ? 1 : 0) : (a<b ? -1 : a<b ? 1 : 0) 
                });
                this.setState({
                    appointments: newApp,
                    appDesc: !this.state.appDesc
                })
                break;
            default:
          }
        
    }

    renderFilters = () =>{
        return(
            <MDBListGroupItem>
                <table>
                    <thead>
                        <tr>
                        <td>sort by:</td>
                        <td><MDBBadge tag="a"  key = {'doc'} style={{color: "warning-color-dark"}} onClick = { () => this.sort('date')} >
                            date 
                            <small>
                                {this.state.dateDesc === true ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                            </small> 
                        </MDBBadge>
                        </td>
                        <td><MDBBadge tag="a"  key = {'doc'} style={{color: "warning-color-dark"}} onClick = { () => this.sort('doctor')} >
                            doctor
                            <small>
                                {this.state.doctorDesc === true ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                            </small> 
                        </MDBBadge>
                        </td>
                        <td><MDBBadge tag="a"  key = {'doc'} style={{color: "warning-color-dark"}} onClick = { () => this.sort('type')} >
                            appointment type
                            <small>
                                {this.state.appDesc === true ? <i className="fas fa-angle-up"></i> : <i className="fas fa-angle-down"></i>}
                            </small>
                        </MDBBadge>
                        </td>
                        </tr>
                    </thead>
                </table>
            </MDBListGroupItem>
        )
    }

    render() {
        return (
            <div>
            {this.renderFilters()}
            {this.renderHistory(this.state.appointments)}
            </div>
        );
    }
}

export default PatientsHistory;