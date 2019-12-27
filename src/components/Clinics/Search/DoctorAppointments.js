import React, { Component, Fragment } from 'react';
import _ from 'loadsh';
import { MDBListGroupItem, MDBBadge } from "mdbreact";
import { connect } from 'react-redux';
import { fetchDoctor } from '../../../actions/doctors'; 
import {showClinic} from '../../../actions/clinic';
import AppointmentDetailCheckout from '../../Appointments/AppointmentDetailCheckout';
import AppointmentRequest from '../../Appointments/AppointmentRequest';


class DoctorAppointments extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            showCheckout: false,
            showRequestAppointment: false,
            loaded: false
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

    componentWillMount = async () =>{ 
        
        this.setState({
            loaded:false
        })
        await this.props.fetchDoctor(this.props.id)
        this.setState({
            loaded: true
        })        
    }


    toggleRequestAppointment = () => {
        this.setState({
            showRequestAppointment: !this.state.showRequestAppointment
        })
    }

    renderAppointments = (appointments) => {                

        if(appointments.length === 0){
            return(
                <a  href onClick = {this.toggleRequestAppointment}>no appointments left, click to send reservation request</a>
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


            if(this.state.loaded){
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
                                <MDBBadge tag="a" color="teal" onClick = { () => this.onInfoClick(appointment)}>info <i className="fas fa-info"/></MDBBadge>

                            </div>

                        </Fragment>
                    </MDBListGroupItem>
            )}else{
                return(
                    <MDBListGroupItem key={1}>
                        Loading...
                    </MDBListGroupItem>
                )
            }
                                
        
        })
    }

    render() {
        return (
            <div>
                {this.props.doctor === null ? '': this.props.doctor.selectedDoctor.appointments.length !== 0 ? <a href onClick = {this.toggleRequestAppointment}>Send custom request</a> : ''}
                { this.props.doctor === null ? 'loading' : this.renderAppointments(this.props.doctor.selectedDoctor.appointments)}
                <AppointmentDetailCheckout show={this.state.showCheckout} toggle={this.toggleCheckoutDialog} appointment = {this.state.appointment} />
                <AppointmentRequest show = {this.state.showRequestAppointment} toggle = {this.toggleRequestAppointment} doctor = {this.props.doctor === null ? null : this.props.doctor.selectedDoctor} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        appointmentTypes: state.clinics.selectedClinic.appointment_types,
        doctor: state.doctors

    }
}

export default connect(mapStateToProps,{showClinic, fetchDoctor})(DoctorAppointments);