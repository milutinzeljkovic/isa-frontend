import React, { Component } from 'react';
import _ from 'loadsh';
import { MDBListGroupItem  } from "mdbreact";
import { connect } from 'react-redux';

class DoctorAppointments extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
        }
        
    }

    renderAppointments = (appointments) => {

        if(appointments.length === 0){
            return(
                'no appointments'
            )
        }

        return _.map(appointments, appointment => {
            const arr = appointment.date.split(' ');
            let date = arr[0];
            let parts = date.split('-');
            let dateTime = parts[2];
            dateTime+='/';
            dateTime+=parts[1];
            dateTime+='/';
            dateTime+=parts[0]; 

            let time = arr[1];

            dateTime+= ' at ';
            dateTime+= time;

            let appointmentTypeName;
            this.props.appointmentTypes.forEach(type => {
                if(type.id === appointment.appointment_type_id)
                    appointmentTypeName = type.name;
            });

            return(
                <MDBListGroupItem
                    key = {appointment.id}
                >  
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" >{appointmentTypeName}</h5>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" >{dateTime}</h5>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1" >price: {appointment.price}</h5>
                    </div>
                </MDBListGroupItem>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderAppointments(this.props.appointments)}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        appointmentTypes: state.clinics.selectedClinic.appointment_types,
    }
}

export default connect(mapStateToProps)(DoctorAppointments);