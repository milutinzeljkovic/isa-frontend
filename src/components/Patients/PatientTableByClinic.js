import React, { Component } from 'react';
import { MDBDataTable, MDBContainer } from 'mdbreact';

import _ from 'loadsh';

import { connect } from 'react-redux';
import { fetchByClinic } from '../../actions/patients';


class PatientTableByClinic extends Component {

  componentWillMount() {
    this.props.fetchByClinic();

  }

  renderList(patients) {
    const data = {
      columns: [
        {
          label: 'First Name',
          field: 'name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Last Name',
          field: 'last_name',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Address',
          field: 'address',
          sort: 'asc',
          width: 150
        },
        {
          label: 'City',
          field: 'city',
          sort: 'asc',
          width: 150
        },
        {
          label: 'State',
          field: 'state',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Phone number',
          field: 'phone_number',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Ensurance ID',
          field: 'ensurance_id',
          sort: 'asc',
          width: 150
        }
      ],
      rows: []
    }
    _.map(patients, patient => {

      data.rows.push({
        name: patient.user.name,
        last_name: patient.user.last_name,
        address: patient.user.address,
        city: patient.user.city,
        state: patient.user.state,
        phone_number: patient.user.phone_number,
        ensurance_id: patient.user.ensurance_id

      })
    })
    return (
      data
    )

  }


  render() {
    return (
      <MDBContainer>
        <MDBDataTable
          striped
          bordered
          hover
          fixed
          data={this.patients === null ? '' : this.renderList(this.props.patients)}
        />
      </MDBContainer>
   

    );
  }
}
const mapStateToProps = (state) => {
  return {
    patients: state.patients,
  }
}

export default connect(mapStateToProps, { fetchByClinic })(PatientTableByClinic);