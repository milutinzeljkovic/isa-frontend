import React, { Component } from 'react';
import _ from 'loadsh';

import { connect } from 'react-redux';
import { fetchByClinic } from '../../actions/patients';



// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class PatientTableByClinic extends Component {

    componentWillMount(){
    this.props.fetchByClinic();

    }

    renderList(patients){    
        return _.map(patients, patient => {
            return(
                patient.user
            )

        })
    
    }
 
    render() {


    return (
        <ReactTable
        data={ this.patients === null ? '' : this.renderList(this.props.patients)}
          columns={[
            {
              Header: "Patients",
              columns: [
                {
                  Header: "First Name",
                  accessor: "name"
                },
                {
                  Header: "Last Name",
                  accessor: "last_name"
                }
                ,
                {
                  Header: "Adress",
                  accessor: "address"
                }
                ,
                {
                  Header: "City",
                  accessor: "city"
                },
                {
                  Header: "State",
                  accessor: "state"
                },
                {
                  Header: "Phone number",
                  accessor: "phone_number"
                }
              ]
            },
         
          ]}
          defaultSorted={[
            {
              id: "name",
              desc: false
            }
          ]}
          
          defaultPageSize={10}
          className="-striped -highlight"
        />
    );
  }
}
const mapStateToProps = (state) => {
    return {
      patients: state.patients,
    }
  }
  
  export default connect(mapStateToProps,{fetchByClinic})(PatientTableByClinic);