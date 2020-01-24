import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBIcon, MDBBtn} from 'mdbreact';
import { MDBTable, MDBTableBody } from 'mdbreact';
import _ from 'loadsh';
import { connect } from 'react-redux';
import { me } from '../../actions/auth';
import { appointmentHistory } from  '../../actions/appointment';
import { update } from "../../actions/patients";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PatientsHistory from './PatientsHistory';
import MedicalRecord from './MedicalRecord';
import {getMedicalRecord} from '../../actions/patients';





class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        }
    }
    datas = ['name','email','last_name','address','city','state','ensurance_id']

    componentDidUpdate(prevProps, prevState){  
        if (prevProps.user !== this.props.user) {
            if(this.props.user !== undefined){                
                this.setState({
                    name: this.props.user === undefined ? '' : this.props.user.name,
                    last_name: this.props.user === undefined ? '' : this.props.user.last_name,
                    email: this.props.user === undefined ? '' : this.props.user.email,
                    address: this.props.user === undefined ? '' : this.props.user.address,
                    city: this.props.user === undefined ? '' : this.props.user.city,
                    state: this.props.user === undefined ? '' : this.props.user.state,
                    ensurance_id: this.props.user === undefined ? '' : this.props.user.ensurance_id
                })
            }
        }
        
    }

    componentDidMount = async () => {
        const res = await this.props.me();        
        await this.props.getMedicalRecord(res.payload.userable_id);
        await this.props.appointmentHistory(res.payload.userable_id);
        
    }

    onSubmitClick = async () => {
        const data = {...this.state, id: this.props.user.id};
        delete data.editMode;
        await this.props.update(data);
        this.setState({
            editMode: false
        })
        
        
    }

    onEditButtonClick = () => {
        if(this.state.editMode){
            this.setState({
                name: this.props.user.name,
                last_name: this.props.user.last_name,
                email: this.props.user.email,
                address: this.props.user.address,
                city: this.props.user.city,
                state: this.props.user.state,
                ensurance_id: this.props.user.ensurance_id
            })
        }
        this.setState({
            editMode: !this.state.editMode
        })
        
    }

    onInputChange = (e,data) => {        
        switch(data){
            case 'name':
                this.setState({
                    name: e.target.value
                });
            break;
            case 'last_name':
                this.setState({
                    last_name: e.target.value
                });
            break;
            case 'address':
                this.setState({
                    address: e.target.value
                });
            break;
            case 'city':
                this.setState({
                    city: e.target.value
                });
            break;
            case 'state':
                this.setState({
                    state: e.target.value
                });
            break;
            default: 

        }
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
                            onChange = {e=>this.onInputChange(e,data)}
                            disabled = {this.state.editMode ? "" : "disabled" || data === 'email' || data ==='ensuranceid'}
                        />
                    </td>
                </tr>
            )
        })
    }

    renderContent = () => {
        if(this.props.user === undefined || this.props.patients === null){
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
                            <MDBCardBody>
                            <MDBCardText>
                                {this.props.user === undefined ? '' : 'Registration date: ' + this.props.user.created_at}
                            </MDBCardText>
                            <MDBIcon far icon="edit" onClick = {this.onEditButtonClick} />

                            </MDBCardBody>
                        </MDBCard>
                    </div>

                    <div className="col-sm-8" id='patients-profile-card-2'>
                        <MDBCard style={{ width: "100%" }}>
                        <Tabs>
                            <TabList>
                                <Tab>Datas</Tab>
                                <Tab>History</Tab>
                                <Tab>Medical record</Tab>
                            </TabList>

                            <TabPanel>
                                <MDBTable>
                                    <MDBTableBody>
                                        {this.renderTable()}
                                    </MDBTableBody>
                                </MDBTable>
                                {this.state.editMode ? <MDBBtn gradient="blue"  onClick = {this.onSubmitClick}>Submit</MDBBtn> : ''}
                            </TabPanel>
                            <TabPanel>
                                <PatientsHistory appointments = {this.props.appointmentsHistory}/>
                            </TabPanel>
                            <TabPanel>
                                <MedicalRecord medicalRecord = {this.props.patients.medicalRecord} />
                            </TabPanel>
                        </Tabs>

                        </MDBCard>
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
        user: state.auth.currentUser,
        patients: state.patients,
        appointmentsHistory: state.appointments
    }
};

export default connect(mapStateToProps, {me, update, getMedicalRecord, appointmentHistory})(Profile);