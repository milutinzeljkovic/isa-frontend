import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { MDBContainer, MDBRow, MDBCol, MDBCard  } from "mdbreact";

import { searchClinics } from '../../../actions/clinic';
import GoogleMap from './GoogleMap';

class SearchClinicDialog extends Component {

    componentWillMount(){
        this.props.searchClinics();
    }

    renderClinics(clinics){
        return _.map(clinics, clinic => {
            return(
                clinic.name
            )
        })
    }

    render() {
        return (
            <div className = 'container'>
                <div className = 'row'>
                <div class="col-xl-8">
                    Lista klinika                           
                </div>
                    <div class="col-xl-4">
                    <MDBCard style={{ width: "400px", height: "400px" }}>
                        <GoogleMap />
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

export default connect(mapStateToProps, { searchClinics })(SearchClinicDialog);