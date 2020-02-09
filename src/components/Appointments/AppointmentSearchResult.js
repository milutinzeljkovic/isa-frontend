import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBCard, MDBListGroupItem, MDBBadge, MDBRow, MDBCol } from "mdbreact";
import AppointmentDetailCheckout from './AppointmentDetailCheckout';
import image from '../../images/doctor-avatar.png';
import ExampleComponent from "react-rounded-image";
import ReactStars from 'react-stars'

import _ from 'loadsh';

class AppointmentSearchResult extends Component {

    constructor(props){
        super(props);
        this.state = {
            showCheckout: false
        }
    }

    toggleCheckoutDialog = () => {
        this.setState({
            showCheckout: !this.state.showCheckout
        })
    }
    onReserveClick = app => {
        this.setState({
            showCheckout: true,
            appointment:app
        })
    }

    renderAppointments = appointments => {
        return _.map(appointments, (app,index) => {
            return(
                
                <MDBCard id ='appointment_card'>
                <MDBListGroupItem 
                    key = {app.id}
                >  
                    <MDBRow>
                        <MDBCol md="4">
                        <ExampleComponent
                            image={image}
                            roundedColor="#321124"
                            imageWidth="150"
                            imageHeight="150"
                            roundedSize="0"
                            />
                            <small>{app.doctor.user.email}</small>
                            <ReactStars
                            count={5}
                            size={24}
                            edit ={false}
                            value={app.doctor.stars_count === null ? 0 : parseInt(app.doctor.stars_count)}
                            color2={'#ffd700'} />
                        </MDBCol>
                        <MDBCol md="8">
                        <div >
                        <h5 className="mb-1"   ><i className="fas fa-calendar"/> {app.date}</h5>
                        <small>{app.clinic.address}</small>
                    </div>
                    <div>
                        <small>room: {app.operations_room === null ? '' : app.operations_room.number}</small>
                    </div>
                    <div>
                        <MDBBadge dusk='badge' tag="a" color="teal" onClick = {()=>this.onReserveClick(app)}>info <i className="fas fa-info"/></MDBBadge>
                    </div>
                        </MDBCol>
                    </MDBRow>


                </MDBListGroupItem>
                </MDBCard>
            )
        })
    }

    render() {
        return (
            <div>
                <AppointmentDetailCheckout show={this.state.showCheckout} toggle={this.toggleCheckoutDialog} appointment = {this.state.appointment} />
                {this.renderAppointments(this.props.appointments !== null ? this.props.appointments.appointments : [])}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        appointments: state.appointments
    }
}

export default connect(mapStateToProps)(AppointmentSearchResult);