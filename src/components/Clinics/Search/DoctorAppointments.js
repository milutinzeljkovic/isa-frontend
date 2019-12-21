import React, { Component, Fragment } from 'react';
import _ from 'loadsh';
import { MDBListGroupItem, MDBBtn, MDBBadge } from "mdbreact";
import { connect } from 'react-redux';
import {showClinic} from '../../../actions/clinic';
import AppointmentDetailCheckout from '../../Appointments/AppointmentDetailCheckout';

class DoctorAppointments extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            showCheckout: false
        }
        
    }

    
    onInfoClick = (appointment) => {
        
        this.setState({
            showCheckout: true,
            appointment
        })
        
    }

    toggleCheckoutDialog = () => {
        this.setState({
            showCheckout: !this.state.showCheckout
        })
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
                    <Fragment>
                        

                        <div className="d-flex w-100 justify-content-between">
                            <h5 color = "teal" className="mb-1" >{appointmentTypeName}</h5>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1" >{dateTime}</h5>
                        </div>
                        <div className="d-inline-flex p-2 bd-highlight">
                            <span className = 'a'>
                                <h5 className="mb-1" >price: {appointment.price} RSD</h5>
                            </span>
                            {
                                appointment.discount !== null ?
                                <span className = 'a'>
                                    <MDBBadge tag="a" color="danger">-{appointment.discount}%</MDBBadge>
                                    
                                </span>
                                :
                                ''
                            }   
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                            <MDBBadge tag="a" color="teal" onClick = { () => this.onInfoClick(appointment)}>info <i class="fas fa-info"/></MDBBadge>

                        </div>

                    </Fragment>
                </MDBListGroupItem>
            )
        })
    }

    render() {
        return (
            <div>
                {this.renderAppointments(this.props.appointments)}
                <AppointmentDetailCheckout show={this.state.showCheckout} toggle={this.toggleCheckoutDialog} appointment = {this.state.appointment} />

            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        appointmentTypes: state.clinics.selectedClinic.appointment_types,
    }
}

export default connect(mapStateToProps,{showClinic})(DoctorAppointments);