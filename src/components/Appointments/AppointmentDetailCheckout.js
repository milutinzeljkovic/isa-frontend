import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBBtn, MDBBadge} from 'mdbreact';
import { connect } from 'react-redux';
import {reserveAppointment } from '../../actions/appointment';

class AppointmentDetailCheckout extends Component {

    constructor(props){
        super(props);
        this.state = {
            appointmentReserved: false
        }

    }

    closeModal = () => {
        this.props.toggle();
    }

    onReserveButtonClick = async () => {        
       await this.props.reserveAppointment(this.props.appointment.id, this.props.clinic);
       
       this.setState({
           appointmentReserved: true
       })
       setTimeout(function() { this.closeModal() }.bind(this),1000)
       this.setState({
           appointmentReserved: false
       })


    }

    renderAppointmentCheckout = (appointment) => {
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
            
            if(this.state.appointmentReserved === false){
                return ( 
                <div >
                    <div className="d-flex w-100 justify-content-between">
                    <MDBBadge tag="a" color="default"><h5 color = "teal" className="mb-1" >{appointment.appointment_type.name}</h5></MDBBadge>
                    </div>
                    <div className="d-flex w-100 justify-content-between">
                        <MDBBadge tag="a" color="default" className="mb-1" >{dateTime}</MDBBadge>
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
                    <div className="d-inline-flex p-2 bd-highlight">
                        <h5 className="mb-1" >room number: </h5>
                        <span className = 'a'>
                            <MDBBadge tag="a" color="default">{appointment.operations_room === null ? '' :appointment.operations_room.number}</MDBBadge>
                        </span>
                    </div>
                    <div className="d-inline-flex p-2 bd-highlight">
                        <h5 className="mb-1" >doctor: </h5>
                        <span className = 'a'>
                        <p tag="a" color="default"> {appointment.doctor.user.name} {appointment.doctor.user.last_name}</p>
                        </span>
                    </div>
                    <div>
                    <MDBBtn outline color="danger" onClick = {this.onReserveButtonClick}>Reserve</MDBBtn>


                    </div>

                    </div>
                    
                )}else{
                return(
                    <div>Appointment successfully reserved!</div>
                )
            }
    }

    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div className="text-center">
                        Appointment checkout
                    </div> 
                </MDBModalHeader>
                <MDBModalBody>
                    { 
                        
                        this.props.appointment !== undefined ?
                        this.renderAppointmentCheckout(this.props.appointment)
                        :
                        ''
                    }
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
    }
}

export default connect(null,{reserveAppointment})(AppointmentDetailCheckout);