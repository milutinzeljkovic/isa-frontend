import React, { Component } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { getOperations } from '../../actions/clinicAdmin';
import { getClinicDoctors } from '../../actions/clinicAdmin';
import AddDoctorsToOperation from './AddDoctorsToOperation';
import AddDurationOperation from './AddDurationOperation';

import { reserveRoomForOperation } from '../../actions/clinicAdmin';
import browserHistory from '../../history';

class OperationsRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddDoctorsToOperationDialog: false,
      showAddDurationDialog: false,
      operation_id: ''
    };
  }

  async componentWillMount() {
    await this.props.getOperations();
    await this.props.getClinicDoctors();

  }

  hideDialog = () => {

    this.setState({
      showAddDoctorsToOperationDialog: !this.state.showAddDoctorsToOperationDialog,
    });
  }

  hideDialog1 = () => {

    this.setState({
      showAddDurationDialog: !this.state.showAddDurationDialog,
    });
  }

  bookRoom = (operation) => {
    this.props.reserveRoomForOperation(operation);
    browserHistory.push('/clinic-admin/all-operating-rooms');

  }


  onEditClickHandler = (id) => {

    this.setState({
      showAddDoctorsToOperationDialog: !this.state.showAddDoctorsToOperationDialog,
      operation_id: id
    });
  }

  addDuration = (id)=>{
    this.setState({
      showAddDurationDialog: !this.state.showAddDurationDialog,
      operation_id: id
    });
  }



  renderList(operations) {
    return _.map(operations, operation => {
      return (
        <tr key={operation.id}>
          <td>{operation.patient.user.name + ' ' + operation.patient.user.last_name}</td>
          <td>{operation.info}</td>
          <td>{operation.date}</td>
          <td>

            {operation.duration === null ? <MDBBtn color="info" onClick={() => this.addDuration(operation.id)} outline>Add duration</MDBBtn> : ''}
            {operation.operations_rooms_id !== null ? <MDBBtn color="info" onClick={() => this.onEditClickHandler(operation.id)} outline>Add doctors</MDBBtn> : ''}
            {operation.duration !== null && operation.operations_rooms_id === null ? <MDBBtn color="info" onClick={() => this.bookRoom(operation)} outline >Book operation room</MDBBtn> : '' }        
          </td>

        </tr>
      )
    })

  }



  render() {
    return (
      <div>
        <AddDurationOperation operation_id={this.state.operation_id} show={this.state.showAddDurationDialog} toggle={this.hideDialog1} />
        {this.props.clinicAdmin === null ? '' : <AddDoctorsToOperation operation_id={this.state.operation_id} show={this.state.showAddDoctorsToOperationDialog} toggle={this.hideDialog} />}
        <MDBTable>
          <MDBTableHead color="info-color" textWhite>
            <tr>
              <th>Patient</th>
              <th>Info</th>
              <th>Date</th>
              <th></th>
            </tr>
          </MDBTableHead>

          <MDBTableBody>
            {this.props.clinicAdmin === null ? '' : this.renderList(this.props.clinicAdmin.operations)}
          </MDBTableBody>
        </MDBTable>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    clinicAdmin: state.clinicAdmin,
  }
}

export default connect(mapStateToProps, { reserveRoomForOperation, getClinicDoctors, getOperations })(OperationsRequest);