import React, { Component } from 'react';
import { MDBCard, MDBBtn, MDBRow} from 'mdbreact';
import { MDBTable, MDBTableBody } from 'mdbreact';
import _ from 'loadsh';
import { connect } from 'react-redux';
import { getClinicAdminClinic } from '../../actions/clinicAdmin';
import { updateClinic } from "../../actions/clinicAdmin";
import  LocationDialog  from "../Location/LocationDialog";


class AdminsClinicDetails extends Component {

    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        }
    }
    datas = ['name','address','description']

    componentDidUpdate(prevProps, prevState){
        if (prevProps.clinicAdmin !== this.props.clinicAdmin) {
            if(this.props.clinicAdmin !== undefined){                
                this.setState({
                    id: this.props.clinicAdmin.clinic.id,
                    name: this.props.clinicAdmin.clinic.name,
                    address: this.props.clinicAdmin.clinic.address,
                    description: this.props.clinicAdmin.clinic.description,
                    clinic_center: this.props.clinicAdmin.clinic.clinical_center_id
                })
            }
        }
        
    }

    componentDidMount(){
        this.props.getClinicAdminClinic();
    }

    onEditButtonClick = () => {
        if(this.state.editMode){
            this.setState({
                id: this.props.clinicAdmin.clinic.id,
                name: this.props.clinicAdmin.clinic.name,
                address: this.props.clinicAdmin.clinic.address,
                description: this.props.clinicAdmin.clinic.description,
                clinic_center: this.props.clinicAdmin.clinic.clinical_center_id
            })
        }
        this.setState({
            editMode: !this.state.editMode
        })
        
    }

    onSubmitClick = async () => {
        const data = {...this.state};
        data.address = this.props.clinicAdress;
        console.log(data);
        delete data.editMode;
        await this.props.updateClinic(data);
        this.setState({
            editMode: false,
            address: this.props.clinicAdress
        })
    }

    onInputChange = (e,data) => {        
        switch(data){
            case 'name':
                this.setState({
                    name: e.target.value
                });
            break;
            case 'address':
                this.setState({
                    address: e.target.value
                });
            break;
            case 'description':
                this.setState({
                    description: e.target.value
                });
            break;
            default: 

        }
    }


    renderTable = () => {
        return _.map(this.datas, data => {
            return(
                <tr key = {data}>
                    <td>{data.replace('_',' ')}</td>
                    <td>
                        <input type="text" 
                            className="form-control"  
                            value ={this.state[data]}
                            onChange = {e=>this.onInputChange(e,data)}
                            disabled = {this.state.editMode && data !== 'address' ? "" : "disabled"}
                        />
                    </td>
                </tr>
            )
        })
    }

    renderContent = () => {
        if(this.props.clinicAdmin === undefined){
            return (
                <div>
                    Loading
                </div>
            )
        }else{
            return(
                <div className="row" id='patients-profile-content'>
                    <div className="col-sm-12">
                        <MDBCard style={{ width: "100%" }}>
                            <MDBTable>
                                <MDBTableBody>
                                    {this.renderTable()}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCard>
                        <MDBRow>
                        <MDBBtn gradient="blue"  onClick = {this.onEditButtonClick}>Edit</MDBBtn>
                        {this.state.editMode ? <MDBBtn gradient="blue"  onClick = {this.onSubmitClick}>Submit</MDBBtn> : ''}
                        {this.state.editMode ? <LocationDialog/> : ''}
                        </MDBRow>
                    </div>
                </div>
            )
        }
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
        clinicAdmin: state.clinicAdmin,
        clinicAdress: state.selectedLocation === null ? '':  state.selectedLocation.usersLocation
    }
};

export default connect(mapStateToProps, {getClinicAdminClinic, updateClinic})(AdminsClinicDetails);