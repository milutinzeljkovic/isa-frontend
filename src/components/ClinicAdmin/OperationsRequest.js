import React, { Component } from 'react';
import { MDBDataTable,MDBContainer } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { getOperations } from '../../actions/clinicAdmin';



class OperationsRequest extends Component {


  componentWillMount(){
    this.props.getOperations();
  }




  renderList(operations) {
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
          label: 'Info',
          field: 'info',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Date',
          field: 'date',
          sort: 'asc',
          width: 150
        }
      ],
      rows: []
    }
    _.map(operations, operation => {

      data.rows.push({
        name: operation.patient.user.name,
        last_name: operation.patient.user.last_name,
        info: operation.info,
        date: operation.date,
        clickEvent: () => this.handleClick(operation.id)

      })
    })
    return (
      data
    )

  }

  handleClick(operation_id){
      console.log(operation_id);
      
  }


  render(){
    return (
        <MDBContainer>
          <MDBDataTable
            striped
            bordered
            hover
            fixed
            data={this.props.clinicAdmin === null ? '' : this.renderList(this.props.clinicAdmin.operations)}
          />
        </MDBContainer>
     
  
      );

  }
}

const mapStateToProps = (state) => {
  return {
    clinicAdmin: state.clinicAdmin,
  }
}

export default connect(mapStateToProps,{getOperations})(OperationsRequest);