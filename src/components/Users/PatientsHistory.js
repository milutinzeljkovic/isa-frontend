import React, { Component } from 'react';
import { MDBListGroupItem } from "mdbreact";
import _ from 'loadsh';

class PatientsHistory extends Component {

    constructor(props){
        super(props);
        console.log(this.props.appointments);
        
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
                        <td><i class="fas fa-user-md"></i></td>
                        <td><h5 className="mb-1">{appointment.doctor.user.name} {appointment.doctor.user.email}</h5></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-clinic-medical"></i></td>
                        <td><h5 className="mb-1">{appointment.clinic.name}</h5></td>                        
                    </tr>
                    <tr>
                        <td><i className="fas fa-map-marker-alt"></i></td>
                        <td><h5 className="mb-1"> {appointment.clinic.address}</h5></td>
                    </tr>
                    <tr>
                        <td><i class="far fa-calendar-check"></i>i</td>
                        <td><h5 className="mb-1">{appointment.date}</h5></td>
                    </tr>

                    <tr>
                        <td><i className="fas fa-info"></i></td>
                        <td><h5 className="mb-1">{appointment.appointment_type.name}</h5></td>
                    </tr>
                    <tr>
                        <td><i class="fas fa-hospital-symbol"></i></td>
                        <td><h5 className="mb-1">{appointment.operations_room.name} {appointment.operations_room.number}</h5></td>
                    </tr>
                    </tbody>
                </table>
                </MDBListGroupItem>
            )
        })
    }

    render() {
        return (
            this.renderHistory(this.props.appointments)
        );
    }
}

export default PatientsHistory;