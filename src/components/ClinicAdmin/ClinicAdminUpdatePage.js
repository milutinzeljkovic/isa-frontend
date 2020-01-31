import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBCollapse, MDBCard, MDBBtn, MDBRow, MDBTableHead } from 'mdbreact';
import _ from 'loadsh';
import { connect } from 'react-redux';
import browserHistory from '../../history';
import { updateDoctor } from '../../actions/clinicAdmin';
import { updateAppType } from '../../actions/appointmentType';
import { updateOpRoom } from '../../actions/operatingRoom';
import { updateDoctorsWorkingDay } from '../../actions/workingHours';

class ClinicAdminUpdatePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            datas: [],
            id: '',
            name: '',
            last_name: '',
            email: '',
            phone_number: '',
            address: '',
            city: '',
            state: '',
            ensurance_id: '',
            number: '',
            collapseID: false
        }
    }

    componentDidMount(){
        this.setDatas();
        if(this.props.mode === 'Doctor mode'){
            this.setState({
                id: this.props.update.toUpdate.id,
                name: this.props.update.toUpdate.name,
                last_name: this.props.update.toUpdate.last_name,
                email: this.props.update.toUpdate.email,
                phone_number: this.props.update.toUpdate.phone_number,
                address: this.props.update.toUpdate.address,
                city: this.props.update.toUpdate.city,
                state: this.props.update.toUpdate.state,
                ensurance_id: this.props.update.toUpdate.ensurance_id,
                mondayFrom: this.props.update.workingHoursUpdate[0].from,
                mondayTo: this.props.update.workingHoursUpdate[0].to,
                tuesdayFrom: this.props.update.workingHoursUpdate[1].from,
                tuesdayTo: this.props.update.workingHoursUpdate[1].to,
                wednesdayFrom: this.props.update.workingHoursUpdate[2].from,
                wednesdayTo: this.props.update.workingHoursUpdate[2].to,
                thursdayFrom: this.props.update.workingHoursUpdate[3].from,
                thursdayTo: this.props.update.workingHoursUpdate[3].to,
                fridayFrom: this.props.update.workingHoursUpdate[4].from,
                fridayTo: this.props.update.workingHoursUpdate[4].to,
                saturdayFrom: this.props.update.workingHoursUpdate[5].from,
                saturdayTo: this.props.update.workingHoursUpdate[5].to,
                sundayFrom: this.props.update.workingHoursUpdate[6].from,
                sundayTo: this.props.update.workingHoursUpdate[6].to,
            });
        }else if(this.props.mode === 'Op room mode'){
            this.setState({
                id: this.props.update.toUpdate.id,
                name: this.props.update.toUpdate.name,
                number: this.props.update.toUpdate.number,
            });
        }else {
            this.setState({
                id: this.props.update.toUpdate.id,
                name: this.props.update.toUpdate.name
            });
        }
        
    }

    toggleCollapse = collapseID => () => {
        this.setState({
          collapseID: !this.state.collapseID
        });
    }

    setDatas = () => {
        if(this.props.mode === 'Doctor mode'){
            this.setState({
                datas: ['name', 'last_name', 'email', 'phone_number', 'address', 'city', 'state', 'ensurance_id']
            });
        }else if(this.props.mode === 'Op room mode'){
            this.setState({
                datas: ['name', 'number']
            });
        }else if(this.props.mode === 'App type mode'){
            this.setState({
                datas: ['name']
            });
        }else {
            this.setState({
                datas: []
            });
        }
    }

    updateEntity = async () => {
        if(this.props.mode === "Doctor mode"){
            const data1 = {id: this.state.id, name: this.state.name, last_name: this.state.last_name, email: this.state.email, phone_number: this.state.phone_number, 
            address: this.state.address, city: this.state.city, state: this.state.state, ensurance_id: this.state.ensurance_id};
            
            const data12 = {mondayFrom: this.state.mondayFrom,mondayTo: this.state.mondayTo, tuesdayFrom: this.state.tuesdayFrom,tuesdayTo: this.state.tuesdayTo,wednesdayFrom: this.state.wednesdayFrom,wednesdayTo: this.state.wednesdayTo,thursdayFrom: this.state.thursdayFrom, 
            thursdayTo: this.state.thursdayTo,fridayFrom: this.state.fridayFrom,fridayTo: this.state.fridayTo,saturdayFrom: this.state.saturdayFrom,saturdayTo: this.state.saturdayTo,sundayFrom: this.state.sundayFrom,sundayTo: this.state.sundayTo}
            
            //await this.props.updateDoctor(data1);
            //await this.props.updateDoctorsWorkingDay(data12,data1.id);

            browserHistory.push("/clinic-admin/all-doctors");
        }else if(this.props.mode === 'Op room mode'){
            const data2 = {id:this.state.id, name:this.state.name, number:this.state.number};
            delete data2.datas;

            await this.props.updateOpRoom(data2);

            browserHistory.push("/clinic-admin/all-operating-rooms");
        }else if(this.props.mode === 'App type mode'){
            const data3 = {id:this.state.id, name:this.state.name};
            delete data3.datas;

            await this.props.updateAppType(data3);

            browserHistory.push("/clinic-admin/all-appointment-types");
        }
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
            case 'email':
                this.setState({
                    email: e.target.value
                });
            break;
            case 'phone_number':
                this.setState({
                    phone_number: e.target.value
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
            case 'number':
                this.setState({
                    number: e.target.value
                });
            break;
            default: 
        }
    }

    onHoursChange = (e,id,string) => {        
        switch(id){
            case 1:
                if(string === 'from'){
                    this.setState({
                        mondayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        mondayTo: e.target.value
                    });
                }
            break;
            case 2:
                if(string === 'from'){
                    this.setState({
                        tuesdayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        tuesdayTo: e.target.value
                    });
                }
            break
            case 3:
                if(string === 'from'){
                    this.setState({
                        wednesdayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        wednesdayTo: e.target.value
                    });
                }
            break
            case 4:
                if(string === 'from'){
                    this.setState({
                        thursdayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        thursdayTo: e.target.value
                    });
                }
            break
            case 5:
                if(string === 'from'){
                    this.setState({
                        fridayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        fridayTo: e.target.value
                    });
                }
            break
            case 6:
                if(string === 'from'){
                    this.setState({
                        saturdayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        saturdayTo: e.target.value
                    });
                }
            break
            case 0:
                if(string === 'from'){
                    this.setState({
                        sundayFrom: e.target.value
                    });
                }else {
                    this.setState({
                        sundayTo: e.target.value
                    });
                }
            break
            default: 
        }
    }


    renderTable = () => {
        if(this.props.update !== null){
            return _.map(this.state.datas, data => {
                return(
                    <tr key = {data}>
                        <td>{(data.charAt(0).toUpperCase() + data.slice(1)).replace('_',' ')}</td>
                        <td>
                            <input type="text" 
                                className="form-control"  
                                defaultValue ={this.props.update.toUpdate[data]}
                                onChange = {e => this.onInputChange(e,data)}
                                disabled = {this.props.update.updatable[0] === "false" ? "" : "disabled"}
                            />
                        </td>
                    </tr>
                )
            })
        }
        
    }

    renderWorkingHoursTableBody = (hours) => {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return _.map(hours, hour => {
            return(
                <tr key = {hour.id}>
                    <td>{days[hour.day - 1]} {hour.day === 0 ? 'Sunday' : ''}</td>
                    <td>
                        <input type="text" 
                            className="form-control"  
                            defaultValue ={hour.from}
                            onChange = {e => this.onHoursChange(e,hour.id, 'from')}
                            disabled = {this.props.update.updatable[0] === "false" ? "" : "disabled"}
                        />
                    </td>
                    <td>
                        <input type="text" 
                            className="form-control"  
                            defaultValue ={hour.to}
                            onChange = {e => this.onHoursChange(e,hour.id, 'to')}
                            disabled = {this.props.update.updatable[0] === "false" ? "" : "disabled"}
                        />
                    </td>
                </tr>
            )
        })
    }

    renderMessage = () => {
        if(this.props.mode === 'Doctor mode'){
            return(
                <p>This doctor is not available for updating because he has been booked in an appointment</p>
            )
        }else if(this.props.mode === 'Op room mode'){
            return(
                <p>This operating room is not available for updating because it is being used in an appointment</p>
            )
        }else if(this.props.mode === 'App type mode'){
            return(
                <p>This appointment type is not available for updating because it is being used in an appointment</p>
            )
        }
    }

    renderContent = () => {
        if(this.props.update === undefined){
            return (
                <div>
                    Loading
                </div>
            )
        }else{
            return(
                <div className="row" id='patients-profile-content'>
                    <div className="col-sm-12">
                        {this.props.update.updatable[0] === "true" ? this.renderMessage() : ''}
                        <MDBCard style={{ width: "100%" }}>
                            <MDBTable>
                                <MDBTableBody>
                                    {this.renderTable()}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBCard>
                        <>
                        <MDBRow>
                            {this.props.mode === 'Doctor mode' ? <MDBBtn color="primary" onClick={this.toggleCollapse("basicCollapse")} style={{ paddingLeft: '15px' }}><span style={{color: 'white'}}>See doctors working hours</span></MDBBtn> : ''}
                        </MDBRow>
                        <MDBRow>
                            <MDBCollapse id="basicCollapse" isOpen={this.state.collapseID}>
                            <MDBTable>
                                <MDBTableHead>
                                    <tr>
                                        <th>Day</th>
                                        <th>From</th>
                                        <th>To</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {this.props.update.workingHoursUpdate !== null ? this.renderWorkingHoursTableBody(this.props.update.workingHoursUpdate) : ''}    
                                </MDBTableBody>
                            </MDBTable>
                            </MDBCollapse>
                        </MDBRow>
                        </>
                        <MDBRow>
                            {this.props.update.updatable[0] === "false" ? <MDBBtn gradient="blue" style={{float:"right"}} onClick={() => this.updateEntity(this.props.update.toUpdate)}>Edit</MDBBtn> : ''}
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
        update: state.update
    }
};

export default connect(mapStateToProps, {updateDoctor, updateOpRoom, updateAppType, updateDoctorsWorkingDay})(ClinicAdminUpdatePage);