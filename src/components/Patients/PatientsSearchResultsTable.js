import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import {seePatientProfile} from '../../actions/patients';
import browserHistory from '../../history';

class PatientsSearchResultsTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      patients: ''
    }
  }

  onSeeProfileClickHandler = id => {
     this.props.seePatientProfile(id);
     browserHistory.push("/patient/profile");
  }

  /*onSeeMedRecordClickHandler = id => {
    //this.props.checkPrescriptions(id);
  }*/

 componentDidUpdate(prevProps, prevState){
  if (prevProps.patients !== this.props.patients) {
      if(this.props.patients !== undefined){                
          this.setState({
              patients: this.props.patients.searchedPatients
          })
      }
  }
}

  renderList(patients){ 

    return _.map(patients, patient => {
      return(
        <tr key={patient.id}>
            <td>{patient.name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.email}</td>
            <td>{patient.city}</td>
            <td>{patient.address}</td>
            <td>{patient.phone_number}</td>
            <td>
              <MDBBtn color="primary" onClick = {() => this.onSeeProfileClickHandler(patient.id)}>See profile</MDBBtn>
            </td>
            <td>
              <MDBBtn color="success" /*onClick = {() => this.onSeeMedRecordClickHandler(patient.id)}*/>See medical record</MDBBtn>
            </td>
        </tr>
      )
    })

  }

  render(){
    return (
      <div>
        <MDBTable>
          <MDBTableHead color="info-color" textWhite>
            <tr>
              <th>Name</th>
              <th>Last name</th>
              <th>E-mail</th>
              <th>City</th>
              <th>Adress</th>
              <th>Phone number</th>
              <th> </th>
              <th> </th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            { this.props.patients === null ? '' : this.renderList(this.props.patients.searchedPatients)}
          </MDBTableBody>
        </MDBTable>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
      patients: state.patients
  }
}

export default connect(mapStateToProps,{seePatientProfile})(PatientsSearchResultsTable);