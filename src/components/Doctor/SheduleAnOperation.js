import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, } from 'mdbreact';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {sheduleAnOperation} from '../../actions/doctors'; 

import {
    MuiPickersUtilsProvider,

    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
class SheduleAnOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            time: new Date()
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


    handleOnSubmit = (e) => {
        e.preventDefault();
        let date = new Date(this.state.date)
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
        let day = ("0" + date.getDate()).slice(-2)
        let final = date.getFullYear() + '-' + mnth + '-' + day;


        let hours = this.state.time.getHours().toString().padStart(2, "0");
        let minutes = this.state.time.getMinutes().toString().padStart(2, "0")
        let textValue = hours + ':' + minutes + ':00';


        let datas={appointment_id:this.props.appointment_id, date:final + ' ' + textValue};
        
        this.props.sheduleAnOperation(datas);

        this.props.toggle()

    }


    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle} />
                    <MDBModalBody>
                        <form onSubmit={(e) => this.handleOnSubmit(e)}>
                            <p className="h4 text-center mb-4">Datum i vreme operacije</p>
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



export default connect(null, {sheduleAnOperation})(SheduleAnOperation);