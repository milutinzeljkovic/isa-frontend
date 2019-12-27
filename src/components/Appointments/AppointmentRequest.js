import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBBtn, MDBBadge} from 'mdbreact';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import {requestAppointment } from '../../actions/appointment';

import _ from 'loadsh';

class AppointmentRequest extends Component {

    constructor(props){
        let c = '2019-01-01 00:00:00';
        super(props);
        this.state = {
            appointment_type: null,
            startDate: c,
            date: null,
            appointmentRequested: false,
            error: false,
            doctorOnVacation: false,
            doctorNotFree: false
        }
    }
    onAppointmentTypeClick = type => {
        if(type.id === this.state.appointment_type){
            this.setState({
                appointment_type: null
            })
        }
        else{
            this.setState({
                appointment_type: type.id
            })

        }
        
    }


    handleChange =  date => {

        const d = new Date(date.getTime());
        let formatted_date = d.getFullYear() +'-'+(d.getMonth() +1) +'-'+ d.getDate();
        
        if(formatted_date === this.state.date){
            
            this.setState({
                date: null
            })
        }else{
            this.setState({
                date: formatted_date
            })
        }


    };


    renderAppointmentTypes = (types) => {
        
        return _.map(types, type => {            
            
            return(
                <MDBBadge className= 'app_type_badge'
                    key = {type.id}
                    tag="a"
                    color = {this.state.appointment_type === type.id ? 'danger': 'teal'}
                    onClick = {()=> this.onAppointmentTypeClick(type)}
                >
                     {type.name}
                </MDBBadge>
            )
        })
    }

    handleDateChange = (date1) => {

        
        this.datum = date1;
        let datum2 = date1.toISOString();
        let datum1 = datum2.replace('T',' ');
        let d = datum1.split(' ');
        let d1 = d[1].split(':');
        let d2 = d1[0];
        var d3 = parseInt(d2);
        d3++;
        d1[0] = d3 +'';
        let novi = d[0] += ' ';
        d1.forEach((e,index) => {
            novi+=e;
            if(index < 2)
            novi+=':'
        });

        const final = novi.split('.')[0];        
        this.setState({
            date: final
        })
    }

    onSubmit = async () => {
        const params = {...this.state};
        params.doctorId = this.props.doctor.id;
        if(params.appointment_type !== null){
            try{
                const res = await this.props.requestAppointment(params);
                if(res.payload !== 'Could not reserve appointment form a given date' && res.payload !== 'Doctor is not free'){
                    this.setState({
                        appointmentRequested: true
                    })
                }
                if(res.payload === 'Could not reserve appointment form a given date'){
                    this.setState({
                        doctorOnVacation: true
                    })
                }else{
                    if(res.payload === 'Doctor is not free'){
                        this.setState({
                            doctorNotFree: true
                        })
                    }
                }
                
            }catch(e){
                this.setState({
                    error: true
                })
            }
                
        }

        
    }
    resetState = () => {
        this.setState({
            appointmentRequested: false,
            error: false,
            doctorOnVacation: false,
            doctorNotFree: false
        })
    }

    renderAppointmentRequest = doctor => {
        if(this.state.appointmentRequested){
            return(<div>
                <p>Request sent</p>
            </div>
            )
        }
        if(this.state.doctorOnVacation || this.state.doctorNotFree){
            return(
                <div>
                    <p>Could not reserve that date, Doctor is busy <a href onClick = {this.resetState}>pick another time</a></p>
                </div>
            )
        }else{
            if(doctor != null){
                return(
                    <form >
                            <p className="h5 text-center mb-4">Appointment request</p>
                            <div>
                            <h5>{  doctor === null ? '' : doctor.user.name +' '+ doctor.user.email}</h5>
    
                            {this.renderAppointmentTypes(doctor.appointment_types)}
                            </div>
                            <div className="text-center">
                            <DateTimePicker format='yyyy-MM-dd HH:mm:ss' onChange={(e) => this.handleDateChange(e)} name="selectDate1" />
                            </div>
                            <div className ="text-center">
                            <MDBBtn onClick = {this.onSubmit}>Send</MDBBtn>
                            <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>
                            </div>

                    </form> 
                )
            }
        }
    }

    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div className="text-center">
                        Appointment checkout
                    </div> 
                </MDBModalHeader>
 
                    <MDBModalBody>
                        { 
                            
                            this.props.doctor !== undefined ?
                            this.renderAppointmentRequest(this.props.doctor)
                            :
                            ''
                        }
                    </MDBModalBody>
                
            </MDBModal>
        </MDBContainer>
        );
    }
}

export default connect(null,{requestAppointment})(AppointmentRequest);