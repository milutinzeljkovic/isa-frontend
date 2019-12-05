import React, { Component } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCloseIcon, MDBListGroup, MDBListGroupItem, MDBIcon} from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { clinicClick, fetchDoctors } from '../../../actions/clinic';
import DoctorAppointments from './DoctorAppointments';


class ClinicDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            showDoctors: false
        }
    }

    componentWillMount(){
        this.props.fetchDoctors(this.props.clickedClinic);
    }

    hancleCloseClick = () => {        
        this.props.clinicClick(undefined);
    }

    handleOnDoctorsClick = () => {
        this.setState({
            showDoctors: !this.state.showDoctors,
            doctorAppointments: null
        })
    }

    onShowAppointmentsClickHandler = (doctor) => {
        if(this.state.doctorAppointments === doctor.id){
            this.setState({
                doctorAppointments: null
            })
            return;
        }
        this.setState({
            doctorAppointments: doctor.id
        });
        
    }

    renderAppointments = (appointments) => {
        return(
            <DoctorAppointments appointments  = {appointments}/>
        )
    }

    renderDoctors = (doctors) => {
        if(this.state.showDoctors){
            return _.map(doctors, doctor => {                
                return(
                    <MDBListGroupItem 
                        key = {doctor.id}
                    >
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">{doctor.user.name + ' ' + doctor.user.last_name}</h5>
                        </div>
                        <p className="mb-1">{doctor.user.email}</p>
                        <small className="text-muted">
                            {doctor.address}
                        </small>
                    <MDBBtn outline color="orange darken-4" onClick = { () => this.onShowAppointmentsClickHandler(doctor)}>{this.state.doctorAppointments === doctor.id ? 'Hide termins ' : 'Show termins '}<i class="far fa-calendar-check"></i></MDBBtn>
                    <MDBListGroup>
                    {
                        this.state.doctorAppointments === doctor.id ? 
                        this.renderAppointments(doctor.appointments)
                        :
                        ''
                    }
                    </MDBListGroup>
                    </MDBListGroupItem>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <MDBCard id = 'clinic-detail-card'>
                    <MDBCardBody>
                        <MDBCloseIcon onClick = {this.hancleCloseClick}/>
                        <MDBCardTitle>{this.props.clinic.name}</MDBCardTitle>
                        <MDBCardText>
                            {this.props.clinic.description}
                        </MDBCardText>
                        
                        <MDBIcon icon="compass" />
                        <MDBCardText>
                            {this.props.clinic.address}
                        </MDBCardText>
                        <MDBBtn color='orange darken-4' onClick = {this.handleOnDoctorsClick}>{this.state.showDoctors === true ? 'Hide doctors' : 'Show doctors'} <i class="fas fa-user-md"></i></MDBBtn>

                        <MDBListGroup>
                            {this.renderDoctors(this.props.doctors)}
                        </MDBListGroup>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        clickedClinic: state.clinics.selectedClinic,
        doctors: state.clinics.clinicDoctors
    }
}

export default connect(mapStateToProps,{clinicClick, fetchDoctors})(ClinicDetail);