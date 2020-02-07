import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, } from 'mdbreact';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import _ from 'loadsh';
import { scheduleAnAppointment } from '../../actions/doctors';

import {
    MuiPickersUtilsProvider,

    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';

class ScheduleAnAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: new Date(),
            price:'',
            appType: ''
        };
    }

    handleDateChange = event => {
        this.setState({
            date: event
        })
    }

    handleTimeChange = event => {
        this.setState({
            time: event
        })
    }

    handlePriceChange = event => {
        this.setState({ price: event.target.value });
    }

    handleAppTypeChange = event => {
        this.setState({ appType: event.target.value });
    }

    handleDiscountChange = event => {
        this.setState({ discount: event.target.value });
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        let date = new Date(this.state.date);
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2);
        let day = ("0" + date.getDate()).slice(-2);
        let final = date.getFullYear() + '-' + mnth + '-' + day;


        let hours = this.state.time.getHours().toString().padStart(2, "0");
        let minutes = this.state.time.getMinutes().toString().padStart(2, "0");
        let textValue = hours + ':' + minutes + ':00';

        let datas = {price:this.state.price, appointment_id: this.props.appointment_id, date: final + ' ' + textValue, appointmentType: this.state.appType};

        this.props.scheduleAnAppointment(datas);
        //console.log(datas);

        this.props.toggle();
    }

    renderAppTypeOptions = (appTypes) =>{
        return _.map(appTypes, appointmentType => {
            return(
                <option key={appointmentType.id} value={appointmentType.id}>{appointmentType.name}</option>
            )
        })
    }


    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle} />
                    <MDBModalBody>
                        <form onSubmit={(e) => this.handleOnSubmit(e)}>
                            <p className="h4 text-center mb-4">Date and time of appointment</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <Grid container justify="space-around">

                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog"
                                        label="Date picker dialog"
                                        format="MM/dd/yyyy"
                                        value={this.state.date}

                                        onChange={date => this.handleDateChange(date)}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="normal"
                                        id="time-picker"
                                        label="Time picker"
                                        value={this.state.time}
                                        onChange={e => this.handleTimeChange(e)}

                                        KeyboardButtonProps={{
                                            'aria-label': 'change time',
                                        }}
                                    />
                                
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <label htmlFor="select" style={{paddingTop:'40px'}}>Select appointment type</label>
                            <select style={{marginLeft:'30px'}} onChange={e => this.handleAppTypeChange(e)}>
                                {this.props.appointments === null ? '' : this.renderAppTypeOptions(this.props.appointments.appointmentTypeOptions)}
                            </select>
                            <MDBInput
                                        label="Price"
                                        group
                                        type="text"
                                        validate
                                        required

                                        onChange={(e) => this.handlePriceChange(e)}
                                    />
                            <div className="text-center mt-4">
                                <MDBBtn onClick={this.props.toggle} color="danger" outline >
                                    Cancel
                            </MDBBtn>
                                <MDBBtn onClick={e => this.handleOnSubmit(e)} color="success" outline type="submit">
                                    Send
                            </MDBBtn>
                            </div>
                        </form>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appointments: state.appointments
    }
}

export default connect(mapStateToProps, {scheduleAnAppointment })(ScheduleAnAppointment);