import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody} from 'mdbreact';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {changeDateoOfOperation} from '../../actions/clinicAdmin';
import browserHistory from '../../history';

import {
    MuiPickersUtilsProvider,

    KeyboardTimePicker,
} from '@material-ui/pickers';
class ChangeDateOfOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
        };
    }

    handleTimeChange = event => {
        this.setState({
            time: event
        })
    }

  

    handleOnSubmit = async (e) => {
        e.preventDefault();
        let hours = this.state.time.getHours().toString().padStart(2, "0");
        let minutes = this.state.time.getMinutes().toString().padStart(2, "0")
        let textValue = hours + ':' + minutes + ':00';
        let date = new Date(this.props.date)
        let mnth = ("0" + (date.getMonth() + 1)).slice(-2)
        let day = ("0" + date.getDate()).slice(-2)
        let final = date.getFullYear() + '-' + mnth + '-' + day;


        let datas = {room_id:this.props.roomId, operation_id: this.props.operation_id, date: final + ' ' + textValue };

        await this.props.changeDateoOfOperation(datas);

        this.props.toggle();
        browserHistory.push('/operations-requests');
        window.location.reload();

        

    }


    render() {
        
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalBody>
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                            <p className="h4 text-center mb-4">Time of operation</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                <Grid container justify="space-around">

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



export default connect(null, { changeDateoOfOperation })(ChangeDateOfOperation);