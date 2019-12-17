import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'loadsh';

import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBadge } from "mdbreact";
import ReactStars from 'react-stars'
import { searchClinics, clinicClick, rateClinic } from '../../../actions/clinic';
import { fetchUsersLoction } from '../../../actions/location';
import GoogleMapUpdater from './GoogleMapUpdater';
import ClinicDetail from './ClinicDetail';
import ClinicFilter from './ClinicFIlter';

class SearchClinicDialog extends Component {

    ratingChanged = async (newRating,clinic) =>{
        const res = await this.props.rateClinic(clinic.id,newRating)
        this.props.searchClinics();
        
        
    }

    componentWillMount(){
        
        this.props.fetchUsersLoction();
        this.props.searchClinics();
    }

    onClinicClickHandle = clinic => {
        this.props.clinicClick(clinic);
    }

    renderClinics(clinics){
        return _.map(clinics, clinic => {
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
        clinics: state.clinics
    }
}

export default connect(mapStateToProps, { searchClinics, fetchUsersLoction, clinicClick, rateClinic })(SearchClinicDialog);