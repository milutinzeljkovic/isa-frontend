import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'loadsh';

import { MDBCard, MDBListGroup, MDBListGroupItem  } from "mdbreact";
import ReactStars from 'react-stars'
import { searchClinics, clinicClick } from '../../../actions/clinic';
import { fetchUsersLoction } from '../../../actions/location';
import GoogleMapUpdater from './GoogleMapUpdater';
import ClinicDetail from './ClinicDetail';
import ClinicFilter from './ClinicFIlter';

class SearchClinicDialog extends Component {

    componentWillMount(){
        this.props.searchClinics();
        this.props.fetchUsersLoction();
    }

    onClinicClickHandle = clinic => {
        this.props.clinicClick(clinic);
    }

    renderClinics(clinics){
        return _.map(clinics, clinic => {
            return(
                <MDBListGroupItem hover href="#"
                    key = {clinic.id}
                >  
                    <div className="d-flex w-100 justify-content-between">
                        <h1 className="mb-1" onClick = {() => this.onClinicClickHandle(clinic)} >{clinic.name}</h1>
                    </div>
                    <p className="mb-1">{clinic.description}</p>
                    <small className="text-muted">
                        {clinic.address}
                    </small>
                    <ReactStars
                        count={5}
                        size={24}
                        color2={'#ffd700'} />
                </MDBListGroupItem>
            )
        })
    }

    render() {
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div class="col-xl-8">
                        {this.props.clinics !== null && this.props.clinics.selectedClinic ===  undefined ? <ClinicFilter/> : ''}
                        {
                            this.props.clinics !== null && this.props.clinics.selectedClinic !==  undefined ? 
                             <ClinicDetail clinic = {this.props.clinics.selectedClinic} />
                            :
                            <MDBCard>
                                    <MDBListGroup style={{ width: "100%" }} id = 'clinics_result'>
                                        { this.props.clinics === null ? '' :  this.renderClinics(this.props.clinics.all)}
                                    </MDBListGroup>   
                            </MDBCard>    
                        }                
                    </div>
                    <div class="col-xl-4" id = 'map-div'>
                        <MDBCard style={{ width: "100%", height: "100%" }}>
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

export default connect(mapStateToProps, { searchClinics, fetchUsersLoction, clinicClick })(SearchClinicDialog);