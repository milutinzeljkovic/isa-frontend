import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardText} from 'mdbreact';
import { MDBTable, MDBTableBody } from 'mdbreact';
import _ from 'loadsh';
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
          ensurance_id: ''
        }
    }
    
    datas = ['name','last_name','address','city','state','ensurance_id']

    componentDidUpdate(prevProps, prevState){  
        if (prevProps.patients !== this.props.patients) {
            if(this.props.patients !== undefined){                
                this.setState({
                    name: this.props.patients.selectedPatient.name,
                    last_name: this.props.patients.selectedPatient.last_name,
                    email: this.props.patients.selectedPatient.email,
                    address: this.props.patients.selectedPatient.address,
                    city: this.props.patients.selectedPatient.city,
                    state: this.props.patients.selectedPatient.state,
                    ensurance_id: this.props.patients.selectedPatient.ensurance_id,
                    created_at: this.props.patients.selectedPatient.created_at
                })
            }
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
                            disabled = "true"
                        />
                    </td>
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
                            <MDBCardBody>
                            <MDBCardText>
                                {this.props.patients === undefined ? '' : 'Registration date: ' + this.state.created_at}
                            </MDBCardText>

                            </MDBCardBody>
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
        patients: state.patients
    }
};

export default connect(mapStateToProps)(PatientProfileSearch);