import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import LocationDialog from '../Location/LocationDialog';
import {addClinic} from '../../actions/clinic';

class AddClinicForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: ''
        }
    }

    handleNameChange = e => {
        this.setState({
            name: e.target.value,
        });
    }

    hanleDescriptionChange = e => {
        this.setState({
            description: e.target.value
        });
    }

    onSubmitHandle = () => {
        const clinic = {...this.state, lat: this.props.lat, lng: this.props.lng, address: this.props.clinicAddress }
        this.props.addClinic(clinic);        
        
    }

    render() {
        return (
            <MDBContainer>
            <MDBRow>
              <MDBCol md="6">
                <form>
                  <div className="grey-text">
                    <MDBInput
                      label="Name"
                      icon="home"
                      group
                      type="text"
                      validate
                      error="wrong"
                      success="right"
                      onChange={e => this.handleNameChange(e)}
                    />
                    <MDBInput
                      type="textarea"
                      rows="2"
                      label="Description"
                      icon="pencil-alt"
                      onChange={e => this.hanleDescriptionChange(e)}

                    />
                  </div>
                </form>
              </MDBCol>
              <MDBCol md="6">
                  <LocationDialog/>
              </MDBCol>
            </MDBRow>
            <MDBRow>
   
                <MDBCol md="12">
                    <div className="text-center">
                        <MDBBtn 
                            outline color="secondary"
                            onClick = {this.onSubmitHandle}
                        >
                        Submit <MDBIcon far icon="paper-plane" className="ml-1" />
                        </MDBBtn>
                    </div>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        );
    }
}

const mapStateToProps = state =>{
    return{
        clinicAddress: state.selectedLocation === null ? '':  state.selectedLocation.usersLocation,
        lat: state.selectedLocation === null ? '':  state.selectedLocation.lat,
        lng: state.selectedLocation === null ? '':  state.selectedLocation.lng,
        
    }
}

export default connect(mapStateToProps, {addClinic})(AddClinicForm);