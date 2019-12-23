import React, { Component } from 'react';
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBadge } from "mdbreact";
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
                    <p className="mb-1">{appointment.date}</p>
                    <p className="mb-1">{appointment.appointmentType.name}</p>
                    <p className="mb-1">{appointment.operationsRoom.name} {appointment.operationsRoom.number}</p>
                    
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