import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBIcon, MDBBtn} from 'mdbreact';
import { MDBTable, MDBTableBody } from 'mdbreact';
import _ from 'loadsh';
import { connect } from 'react-redux';
import { me } from '../../actions/auth';
import { update } from "../../actions/patients";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PatientsHistory from './PatientsHistory';
import MedicalRecord from './MedicalRecord';

const apps = [
    {
      id: 1,
      date: "2019-12-19 13:58:33",
      price: 1000,
      done: 1,
      clinic_id: 1,
      appointment_type_id: 1,
      operations_room_id: 1,
      patient_id: 9,
      created_at: "2019-12-03 09:09:48",
      updated_at: "2019-12-11 11:05:31",
      doctor_id: 1,
      lock_version: 23,
      appointmentType:{
        id: 1,
        name: "pregled grla",
        created_at: "2019-12-03 09:03:07",
        updated_at: "2019-12-03 09:03:07",
      },
      operationsRoom:{
        id: 1,
        number: 1,
        name: "sala za preglede opste prakse",
        clinic_id: 1,
        created_at: "2019-12-16 09:48:33",
        updated_at: "2019-12-16 09:48:33",
        reserved: 0,
      },
    },
    {
        id: 2,
        date: "2019-12-19 13:58:33",
        price: 1000,
        done: 1,
        clinic_id: 1,
        appointment_type_id: 1,
        operations_room_id: 1,
        patient_id: 9,
        created_at: "2019-12-03 09:09:48",
        updated_at: "2019-12-11 11:05:31",
        doctor_id: 1,
        lock_version: 23,
        appointmentType:{
            id: 1,
            name: "pregled grla",
            created_at: "2019-12-03 09:03:07",
            updated_at: "2019-12-03 09:03:07",
          },
          operationsRoom:{
            id: 1,
            number: 1,
            name: "sala za preglede opste prakse",
            clinic_id: 1,
            created_at: "2019-12-16 09:48:33",
            updated_at: "2019-12-16 09:48:33",
            reserved: 0,
          },
      },
      {
        id: 3,
        date: "2019-12-19 13:58:33",
        price: 1000,
        done: 1,
        clinic_id: 1,
        appointment_type_id: 1,
        operations_room_id: 1,
        patient_id: 9,
        created_at: "2019-12-03 09:09:48",
        updated_at: "2019-12-11 11:05:31",
        doctor_id: 1,
        lock_version: 23,
        appointmentType:{
            id: 1,
            name: "pregled grla",
            created_at: "2019-12-03 09:03:07",
            updated_at: "2019-12-03 09:03:07",
          },
          operationsRoom:{
            id: 1,
            number: 1,
            name: "sala za preglede opste prakse",
            clinic_id: 1,
            created_at: "2019-12-16 09:48:33",
            updated_at: "2019-12-16 09:48:33",
            reserved: 0,
          },
      }];

const medicalRecord = {
    id: 1,
    patient_id: 2,
    created_at: "2019-12-11 15:41:25",
    updated_at: "2019-12-11 15:41:25",
    medicalReports: {
        all: [
          {
            id: 1,
            created_at: "2019-12-11 15:44:20",
            updated_at: "2019-12-11 15:46:01",
            medical_record_id: 1,
            diagnose_id: 1,
            information: null,
            diagnose: {
                id: 1,
                name: "sore throat",
                description: "patient has red sored throat",
                created_at: "2019-12-11 15:43:22",
                updated_at: "2019-12-11 15:43:22",
                clinical_center_id: null,
              },
            doctor: {
                id: 1,
                created_at: "2019-11-25 15:28:10",
                updated_at: "2019-12-20 15:28:41",
                clinic_id: 1,
                stars_count: "2.5",
                user:  {
                    id: 15,
                    name: "miki",
                    email: "miki@predator.rs",
                    created_at: "2019-12-02 16:32:14",
                    updated_at: "2019-12-02 16:32:14",
                    ensurance_id: "123123",
                    phone_number: "1239812",
                    last_name: "predator",
                    address: "asjldh",
                    city: "jsalda",
                    state: "jasdh",
                    userable_id: 2,
                    userable_type: "App\Doctor",
                    has_loggedin: 0,
                  },
              },
            prescriptions: {
                all: [
                  {
                    id: 1,
                    medical_report_id: 1,
                    medicine_id: 2,
                    info: "3x na dan",
                    created_at: "2019-12-11 15:53:55",
                    updated_at: "2019-12-11 16:01:39",
                    medicine:{
                        id: 2,
                        name: "novi lek",
                        created_at: "2019-12-05 12:07:54",
                        updated_at: "2019-12-05 12:07:54",
                      },
                    nurse: {
                        id: 1,
                        created_at: "2019-11-25 15:29:24",
                        updated_at: "2019-11-25 15:32:56",
                        clinic_id: 1,
                        user:{
                            id: 11,
                            name: "nurse",
                            email: "nurse@nurse.rs",
                            created_at: "2019-11-25 15:29:24",
                            updated_at: "2019-12-10 13:22:25",
                            ensurance_id: "9809808",
                            phone_number: "91238120",
                            last_name: "nurse",
                            address: "saidjaslk",
                            city: "novi sad",
                            state: "sersf",
                            userable_id: 1,
                            userable_type: "App\Nurse",
                            has_loggedin: 1,
                          },
                      },
                    nurse_id: null,
                  },
                ],
              },
          },
        ],
      },
    medicalDatas: {
      all: [
        {
          id: 1,
          name: "weight",
          unit: "kg",
          created_at: "2019-12-22 13:24:41",
          updated_at: "2019-12-22 13:24:56",
          medical_data_medical_record:{
            medical_record_id: 1,
            medical_data_id: 1,
            value: "80",
          },
        },
        {
          id: 2,
          name: "height",
          unit: "kg",
          created_at: "2019-12-22 13:25:37",
          updated_at: "2019-12-22 13:25:37",
          medical_data_medical_record:{
            medical_record_id: 1,
            medical_data_id: 2,
            value: "180",
          },
        },
        {
          id: 3,
          name: "blood group",
          unit: null,
          created_at: "2019-12-22 13:26:22",
          updated_at: "2019-12-22 13:26:22",
          medical_data_medical_record: {
            medical_record_id: 1,
            medical_data_id: 3,
            value: "0",
          },
        },
      ],
    },
  }




class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            editMode: false,
        }
    }
    datas = ['name','last_name','address','city','state','ensurance_id']

    componentDidUpdate(prevProps, prevState){  
        if (prevProps.user !== this.props.user) {
            if(this.props.user !== undefined){                
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
        }
        
    }

    componentDidMount(){
        this.props.me();
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
            case 'ensurance_id':
                this.setState({
                    ensurance_id: e.target.value
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
                            disabled = {this.state.editMode ? "" : "disabled"}
                        />
                    </td>
                </tr>
            )
        })
    }

    renderContent = () => {
        if(this.props.user === undefined){
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
                                <PatientsHistory appointments = {apps}/>
                            </TabPanel>
                            <TabPanel>
                                <MedicalRecord medicalRecord = {medicalRecord} />
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
        user: state.auth.currentUser
    }
};

export default connect(mapStateToProps, {me, update})(Profile);