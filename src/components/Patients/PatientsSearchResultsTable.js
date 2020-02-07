import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import {seePatientProfile, getPatientsAppointments} from '../../actions/patients';
import browserHistory from '../../history';

class PatientsSearchResultsTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      patients: ''
    }
  }

  onSeeProfileClickHandler = async patient => {
    console.log(patient);
    
     await this.props.seePatientProfile(patient);
     await this.props.getPatientsAppointments(patient.id); 
     browserHistory.push("/patient/profile");
  }

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
            <td>{patient.user.name}</td>
            <td>{patient.user.last_name}</td>
            <td>{patient.user.email}</td>
            <td>{patient.user.city}</td>
            <td>{patient.user.address}</td>
            <td>{patient.user.phone_number}</td>
            <td>
              <MDBBtn color="primary" onClick = {() => this.onSeeProfileClickHandler(patient)}>See profile</MDBBtn>
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
              <th>See profile</th>
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

export default connect(mapStateToProps,{seePatientProfile, getPatientsAppointments})(PatientsSearchResultsTable);