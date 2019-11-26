import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { fetchAll } from '../../actions/patients';
import { acceptRegistration } from '../../actions/patients';
import MailForm from '../MailForm';



class PatientTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      showMessageBox: false,
      id: ''
    }
  }

  componentWillMount(){
    this.props.fetchAll();
  }


  hideMessageBox = () => {
    this.setState({
      showMessageBox: !this.state.showMessageBox
    })
  }

  onAddButtonClickHandel  = idx =>{
    this.setState({
      showMessageBox: true,
      id: idx
    })
  }

  onAcceptRegistrationClickHandler = id => {
     this.props.acceptRegistration(id);
  }

 
  renderList(patients){    
    return _.map(patients, patient => {
      return(
        <tr key={patient.email}>
            <td>{patient.name}</td>
            <td>{patient.last_name}</td>
            <td>{patient.address}</td>
            <td>
              <MDBBtn color="success" onClick = {() => this.onAcceptRegistrationClickHandler(patient.id)}>Accept</MDBBtn>
              <MDBBtn color="danger" onClick = {() => this.onAddButtonClickHandel(patient.id)}>Decline</MDBBtn>
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
              <th>Address</th>
              <th></th>

            </tr>
          </MDBTableHead>

          <MDBTableBody>
            { this.patients === null ? '' : this.renderList(this.props.patients)}
          </MDBTableBody>
        </MDBTable>
        <MailForm id={this.state.id} show={this.state.showMessageBox} toggle={this.hideMessageBox} />
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    patients: state.patients,
    acceptReg: state.acceptReg
  }
}

export default connect(mapStateToProps,{fetchAll, acceptRegistration})(PatientTable);