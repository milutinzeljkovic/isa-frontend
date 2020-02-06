import React, { Component } from 'react';
import { MDBCard, MDBCardImage, MDBBtn, MDBCardText} from 'mdbreact';
import { MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCollapse } from 'mdbreact';
import _ from 'loadsh';

import { getDataForDoctor } from '../../actions/doctors';
import browserHistory from '../../history';
import { connect } from 'react-redux';

class PatientProfileSearch extends Component {

    constructor(props){
        super(props);
        this.state = {
          name: '',
          last_name: '',
          email: '',
          address: '',
          city: '',
          state: '',
          ensurance_id: '',
          collapseID: false
        }
    }
    
    datas = ['name','last_name','address','city','state','ensurance_id']

    toggleCollapse = collapseID => () => {
        this.setState({
          collapseID: !this.state.collapseID
        });
    }

    randomFunction = async appTypeID => {
        await this.props.getDataForDoctor(appTypeID);



    
        browserHistory.push({
        pathname:`/doctor/start-appointment/${appTypeID}`,
        });
    }

    componentDidMount(){  
        this.setState({
            name: this.props.patients.selectedPatient.name,
            last_name: this.props.patients.selectedPatient.last_name,
            email: this.props.patients.selectedPatient.email,
            address: this.props.patients.selectedPatient.address,
            city: this.props.patients.selectedPatient.city,
            state: this.props.patients.selectedPatient.state,
            ensurance_id: this.props.patients.selectedPatient.ensurance_id
        })
    }

    renderTable = () => {
        return _.map(this.datas, data => {
            return(
                <tr key = {data}>
                    <td>{data.replace('_','')}</td>
                    <td>
                        <input type="text" 
                            className="form-control"  
                            value ={this.state[data]}
                            disabled = "true"
                        />
                    </td>
                </tr>
            )
        })
    }

    renderTableApps = () => {
        return (
            <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Appointment type</th>
                        <th></th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {this.props.patients === undefined ? '' : this.renderTableBody(this.props.patients.patientsAppointments)}
                </MDBTableBody>
            </MDBTable>
        )
    }

    renderTableBody = (appointments) => {
        return _.map(appointments, appointment => {
            return(
                <tr key = {appointment.id}>
                    <td>{(appointment.date).split(" ")[0]}</td>
                    <td>{(appointment.date).split(" ")[1]}</td>
                    <td>{appointment.appointment_type.name}</td>
                    <td><MDBBtn color="primary" onClick = {() => this.randomFunction(appointment.id)}>View appointment</MDBBtn></td>
                </tr>
            )
        })
    }

    renderContent = () => {
        if(this.props.patients === undefined){
            return (
                <div>
                    Loading
                </div>
            )
        }else{
            return(
                <div className="row" id='patients-profile-content'>
                    <div className="col-sm-4" id='patients-profile-card-1'>
                        <MDBCard style={{ width: "100%" }}>
                            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
                            <MDBCardText>
                                {this.state.name + ' ' + this.state.last_name + '\'s profile page'}
                            </MDBCardText>
                        </MDBCard>
                    </div>

                    <div className="col-sm-8" id='patients-profile-card-2'>
                        <MDBCard style={{ width: "100%" }}>
                            <MDBTable>
                                <MDBTableBody>
                                    {this.renderTable()}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCard>

                        <>
                        <MDBRow>
                            <MDBBtn color="primary"><span style={{color: 'white'}} onClick={this.toggleCollapse("basicCollapse")}>See appointments</span></MDBBtn>
                        </MDBRow>
                        <MDBRow>
                            <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                                {this.props.patients.patientsAppointments.length > 0 ? this.renderTableApps() : <p>This patient has had/has no appointments</p>} 
                            </MDBCollapse>
                        </MDBRow>
                        </>
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
        patients: state.patients,
        doctors: state.doctors
    }
};

export default connect(mapStateToProps,{getDataForDoctor})(PatientProfileSearch);