import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'loadsh';

import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBadge } from "mdbreact";
import ReactStars from 'react-stars'
import { searchClinics, rateClinic, showClinic } from '../../../actions/clinic';
import { fetchUsersLoction } from '../../../actions/location';
import GoogleMapUpdater from './GoogleMapUpdater';
import { appointmentHistory } from '../../../actions/appointment';
import { me } from '../../../actions/auth';

import ClinicDetail from './ClinicDetail';
import ClinicFilter from './ClinicFIlter';

class SearchClinicDialog extends Component {

    ratingChanged = async (newRating,clinic) =>{
        await this.props.rateClinic(clinic.id,newRating)
        this.props.searchClinics();
    }

    componentWillMount = async() =>{
        await this.fetchPatientHistory();
        this.props.fetchUsersLoction();
        this.props.searchClinics();
    }

    fetchPatientHistory = async () => {
        await this.props.me();
        if(this.props.currentUser !== undefined && this.props.currentUser.userable_type === 'App\\Patient'){
            await this.props.appointmentHistory(this.props.currentUser.userable_id);
        }else{
            if(this.props.currentUser === undefined){
                await this.props.me();
            }
        }
    }

    onClinicClickHandle = async clinic => {   
        await this.props.showClinic(clinic.id);
    }

    renderClinics(clinics){

        let canRateClinics = [];
        this.props.patientHistory.forEach(app => {
            canRateClinics.push(app.clinic_id);
        });

        return _.map(clinics, clinic => {            
            const canRate = canRateClinics.includes(clinic.id);           
            const starsValue = clinic.stars_count === null ? 0 : clinic.stars_count;
            return(
                <MDBListGroupItem 
                    key = {clinic.id}
                >  
                    <div className="d-flex w-100 justify-content-between" hover href>
                        <h1 className="mb-1"  onClick = {() => this.onClinicClickHandle(clinic)} >{clinic.name}</h1>
                    </div>
                    <MDBBadge outline tag="a" color="teal" onClick = {() => this.onClinicClickHandle(clinic)}>details <i class="fas fa-info"></i></MDBBadge>
                    <p className="mb-1">{clinic.description}</p>
                    <small className="text-muted">
                    <i class="fas fa-map-marker-alt"></i> {clinic.address}
                    </small>
                    <ReactStars
                        count={5}
                        size={24}
                        edit={canRate}
                        onChange={ (newRating) => this.ratingChanged(newRating,clinic)}
                        value={starsValue}
                        color2={'#ffd700'} />
                </MDBListGroupItem>
            )
        })
    }

    render() {
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div className="col-xl-8">
                        {this.props.clinics !== null && this.props.clinics.selectedClinic ===  undefined ? <ClinicFilter/> : ''}
                        {
                            this.props.clinics !== null && this.props.clinics.selectedClinic !==  undefined ? 
                             <ClinicDetail clinic = {this.props.clinics.selectedClinic} />
                            :
                            <MDBCard id='clinics-card'>
                                    <MDBListGroup style={{ width: "100%" }} id = 'clinics_result'>
                                        { this.props.clinics === null ? '' :  this.renderClinics(this.props.clinics.all)}
                                    </MDBListGroup>   
                            </MDBCard>    
                        }                
                    </div>
                    <div className="col-xl-4" id = 'map-div'>
                        <MDBCard style={{ width: "100%", height: "100%" }} id= 'map-card'>
                            { this.props.clinics === null ? ' ' : <GoogleMapUpdater />}
                        </MDBCard> 
                            
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        clinics: state.clinics,
        currentUser: state.auth.currentUser,
        patientHistory: state.appointments
    }
}

export default connect(mapStateToProps, { searchClinics, fetchUsersLoction, rateClinic, appointmentHistory, me, showClinic })(SearchClinicDialog);