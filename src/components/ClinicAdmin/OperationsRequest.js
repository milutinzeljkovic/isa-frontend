import React, { Component } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { getOperations } from '../../actions/clinicAdmin';
import { getClinicDoctors } from '../../actions/clinicAdmin';
import AddDoctorsToOperation from './AddDoctorsToOperation';


class OperationsRequest extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAddDoctorsToOperationDialog: false,
      operation_id:''
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

  onEditClickHandler = (id) => {

    this.setState({
      showAddDoctorsToOperationDialog: !this.state.showAddDoctorsToOperationDialog,
      operation_id:id
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
            {_.isEmpty(operation.doctors)?<MDBBtn color="info" onClick={() => this.onEditClickHandler(operation.id)} outline>Edit</MDBBtn>:''}
            <MDBBtn color="info" outline >Book operation room</MDBBtn>
          </td>

        </tr>
      )
    })

  }

  

  render() {
    return (
      <div>
        {this.props.clinicAdmin===null?'': <AddDoctorsToOperation operation_id={this.state.operation_id} show={this.state.showAddDoctorsToOperationDialog} toggle={this.hideDialog} />}
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

export default connect(mapStateToProps, { getClinicDoctors, getOperations })(OperationsRequest);