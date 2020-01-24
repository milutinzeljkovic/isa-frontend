import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCloseIcon, MDBListGroup, MDBListGroupItem, MDBIcon,MDBBadge} from 'mdbreact';
import { connect } from 'react-redux';
import { rateDoctor } from '../../../actions/clinic';

import _ from 'loadsh';
import {showClinic} from '../../../actions/clinic';
import { fetchDoctor } from '../../../actions/doctors'; 
import { clinicClick, fetchDoctors } from '../../../actions/clinic';
import { appointmentHistory } from '../../../actions/appointment';
import ReactStars from 'react-stars'
import DoctorAppointments from './DoctorAppointments';
import DoctorFilter from './DoctorFilter';


class ClinicDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            showDoctors: false,
            doctorReady: false
        }
    }

    async componentWillMount(){        
        await this.props.fetchDoctors(this.props.clickedClinic);
        await this.props.showClinic(this.props.clickedClinic.id);
        
        if(this.props.currentUser.userable_type === 'App\\Patient'){            
           // await this.props.appointmentHistory(this.props.currentUser.userable_id);
        }
        
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

    onShowAppointmentsClickHandler = async (doctor) => {
        

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

    componentWillReceiveProps(){
        if(this.props.doctor !== null){
            this.setState({
                doctorReady: true
            })
        }
    }

    ratingChanged = async (newRating,doctor) =>{
        await this.props.rateDoctor(doctor.id,newRating);
        this.props.fetchDoctors(this.props.clickedClinic);

        
    }

    renderAppointments = (appointments) => {        
        return(
            <DoctorAppointments appointments = {appointments}/>
        )
    }

    renderDoctorsFilter = () => {
        if(this.state.showDoctors && this.props.doctors !== [] ){
            return (
                <div>
                    <DoctorFilter clinic_id = {this.props.clickedClinic.id}/>
                </div>
            )
        }
    }

    renderDoctors = (doctors) => {
        if(this.state.showDoctors){
            let canRateDoctors = [];
        
        try{
            this.props.patientHistory.forEach(app => {
                canRateDoctors.push(app.doctor_id);
            });
        }catch(e){
            
        }

            
            return _.map(doctors, (doctor,index) => {   
                const canRate = canRateDoctors.includes(doctor.id);           
                return(
                    <MDBCard id ={ index === 0 ? 'doctor-card-0':  'doctor-card'} key = {doctor.id}>

                    <MDBListGroupItem 
                        key = {doctor.id}
                    >
                        <div className="d-flex w-100 justify-content-between">
                            {
                                doctor.user !== undefined
                                ? 
                                <h5 className="mb-1">{doctor.user.name + ' ' + doctor.user.last_name}</h5>
                                :
                                <h5 className="mb-1">{doctor.name + ' ' + doctor.last_name}</h5>

                            }
                        </div>
                        {
                                doctor.user !== undefined
                                ? 
                                <div style={{ display: "inline" }}>
                                    <p className="mb-1">
                                        {doctor.user.email}
                                    {
                                        canRate ? <MDBBadge tag="a" style={{ margin: "1%" }} key = {'doc'} color="danger">had appointment</MDBBadge> : ''
                                    }
                                    </p>
                
                                </div>
                                :
                                ''
                            
                        }
                        <small className="text-muted">
                            {doctor.address}
                        </small>
                        <ReactStars
                            count={5}
                            size={24}
                            edit={canRate}
                            onChange={ (newRating) => this.ratingChanged(newRating,doctor)}
                            value={doctor.stars_count === null ? 0 : parseInt(doctor.stars_count)}
                            color2={'#ffd700'} />
                        {
                            doctor.stars_count !== null ? 
                            <MDBBadge color='blue'>{doctor.stars_count}</MDBBadge>
                            :
                            ''
                        }
                    <br></br>
                    
                    <MDBBadge tag="a" color="orange darken-4" onClick = { () => this.onShowAppointmentsClickHandler(doctor)}>{this.state.doctorAppointments === doctor.id ? 'Hide termins ' : 'Show termins '}<i className="far fa-calendar-check"></i></MDBBadge>
                    <MDBListGroup>
                    {
                        this.state.doctorAppointments === doctor.id ? 
                        
                        <DoctorAppointments key={doctor.id} id ={ doctor.id} />
                        :
                        ''
                    }
                    </MDBListGroup>
                    </MDBListGroupItem>
                    </MDBCard>
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
                        <MDBBadge tag="a" color='orange darken-4' onClick = {this.handleOnDoctorsClick}>{this.state.showDoctors === true ? 'Hide doctors' : 'Show doctors'} <i className="fas fa-user-md"></i></MDBBadge>
                        <div>
                            {this.renderDoctorsFilter()}
                        </div>
                        <div>
                            {this.renderDoctors(this.props.doctors)}
                        </div>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        clickedClinic: state.clinics.selectedClinic,
        doctors: state.clinics.clinicDoctors,
        currentUser: state.auth.currentUser,
        patientHistory: state.appointments,
        doctor: state.doctors
    }
}

export default connect(mapStateToProps,{clinicClick, fetchDoctors, rateDoctor, appointmentHistory, showClinic, fetchDoctor})(ClinicDetail);