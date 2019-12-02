import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer, MDBBtn } from "mdbreact";
import { connect } from 'react-redux';
import _ from 'loadsh';
import { searchClinics } from '../../actions/clinic';
import AddClinicAdminDialog from './AddClinicAdminDialog';

class AddClinicAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
          showDialog: false,
          id: ''
        }
      }

    componentWillMount() {
        this.props.searchClinics();
    }

    
    hideDialog = () => {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }

    onAddAdminClickHandel  = idx =>{
        this.setState({
            showDialog: true,
            id: idx
        })
    }


    renderClinics(clinics) {
        return _.map(clinics, clinic => {
            return (
                  <MDBListGroupItem hover key={clinic.id}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{clinic.name}</h5>
                    <MDBBtn outline color="primary" onClick = {() => this.onAddAdminClickHandel(clinic.id)} >Add</MDBBtn>
                  </div>
                  <p className="mb-1">{clinic.description}.</p>
                  <small className="text-muted">{clinic.address}</small>
                </MDBListGroupItem>
            )
        })
    }


    render() {
        return (
            <div>
                <MDBContainer>
                    <MDBListGroup >
                        {this.renderClinics(this.props.clinics)}
                    </MDBListGroup>
                </MDBContainer>
                <AddClinicAdminDialog id={this.state.id} show={this.state.showDialog} toggle={this.hideDialog} />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        clinics: state.clinics
    }
}

export default connect(mapStateToProps, { searchClinics })(AddClinicAdmin);