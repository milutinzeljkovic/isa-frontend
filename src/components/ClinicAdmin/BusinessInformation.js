import React, { Component } from 'react';
import { MDBCard, MDBBtn, MDBRow} from 'mdbreact';
import { MDBTable, MDBTableBody } from 'mdbreact';
import _ from 'loadsh';
import { connect } from 'react-redux';
import { getClinicAdminClinic } from '../../actions/clinicAdmin';
import { updateClinic } from "../../actions/clinicAdmin";
import  LocationDialog  from "../Location/LocationDialog";


class BusinessInformation extends Component {

    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        }
    }
    

    componentDidMount(){
    }

    

    render() {
        return (
            <div className="container">
                {this.renderContent()}          
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{

    }
};

export default connect(mapStateToProps, {})(BusinessInformation);