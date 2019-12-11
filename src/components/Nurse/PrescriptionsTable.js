import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import _ from 'loadsh';
import { fetchPrescriptions } from '../../actions/prescriptions';
import { checkPrescriptions } from '../../actions/prescriptions';

class PrescriptionsTable extends Component {

  constructor(props){
    super(props);
    this.state = {
      id: ''
    }
  }

  componentWillMount(){
    this.props.fetchPrescriptions();
  }




  onAddButtonClickHandel  = idx =>{
    this.setState({
      id: idx
    })
  }

  onCheckPrescriptionsClickHandler = id => {
     this.props.checkPrescriptions(id);
  }

 
  renderList(prescriptions){ 

    return _.map(prescriptions, prescription => {
      return(
        <tr key={prescription.id}>
            <td>Prescription: {prescription.id}</td>
            <td>{prescription.info}</td>
            <td>
              <MDBBtn color="success" onClick = {() => this.onCheckPrescriptionsClickHandler(prescription.id)}>Check</MDBBtn>
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
              <th>ID</th>
              <th>Description</th>
              <th></th>

            </tr>
          </MDBTableHead>

          <MDBTableBody>
            { this.prescriptions === null ? '' : this.renderList(this.props.prescriptions)}
          </MDBTableBody>
        </MDBTable>
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    prescriptions: state.prescriptions,

  }
}

export default connect(mapStateToProps,{fetchPrescriptions,checkPrescriptions})(PrescriptionsTable);