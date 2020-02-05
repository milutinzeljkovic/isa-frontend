import React, { Component } from 'react';
import { MDBCard, MDBCardBody,  MDBCardTitle, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,  MDBContainer, MDBBtn, MDBBadge} from "mdbreact";
import { connect } from 'react-redux';
import { getAppointmentTypes } from '../../actions/appointmentType';
import { searchAppointment } from '../../actions/appointment';
import _ from 'loadsh';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';

import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from '@material-ui/pickers';

class AppointmentSearchDialog extends Component {

    constructor(props){
        const date = new Date();
        const m = date.getMonth() +1;
        let c = date.getFullYear() + '-' + m + '-' + date.getDate();
        super(props);
        this.state = {
            startDate: c,
            selectedDate: null,
            selectedType: null
        }
    }

    async componentWillMount(){
        await this.props.getAppointmentTypes();
    }

    onDateSelect = date => {           
        const d = new Date(date.getTime());
        let formatted_date = d.getFullYear() +'-'+(d.getMonth() +1) +'-'+ d.getDate();             
        this.setState({
            selectedDate: formatted_date
        })
    }

    onTypeSelect = type => {                
        this.setState({
            selectedType: type
        })
    }

    onSearch = (e) => {
        e.preventDefault();
        let params = {
            date: this.state.selectedDate,
            type: this.state.selectedType
        }        
        this.props.searchAppointment(params)
    }

    renderAppointmentTypes = appointmentTypes => {
        return _.map(appointmentTypes, type=>{
            return(
                <MDBDropdownItem key ={type.id} onClick = { () => this.onTypeSelect(type)}>{type.name}</MDBDropdownItem>

            )
        })
    }

    resetState = ()=>{
        this.setState({
            selectedDate: null,
            selectedType: null
        })
    }

    render() {
        return (
            <div id = 'appointment-search'>
                <MDBCard>
                    <MDBCardBody>
                            <MDBCardTitle>
                                <MDBBadge color='blue'>Reserve in one click</MDBBadge>
                            </MDBCardTitle>
                        <MDBContainer>
                                    <form>
                                        <div className = "text-left py-4 mt-3">
                                        
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <Grid container justify="space-around">
                                            <table>
                                            
                                            <MDBDropdown size="sm">
                                                <MDBDropdownToggle caret color="blue">
                                                {this.state.selectedType === null ? 'Type' : this.state.selectedType.name}  
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu color="blue" basic>
                                                    {this.renderAppointmentTypes(this.props.appointmentTypes)}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Date picker dialog"
                                                    format="MM/dd/yyyy"
                                                    value={this.state.selectedDate === null ? this.state.startDate : this.state.selectedDate}
                                                    onChange={date => this.onDateSelect(date)}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                            <MDBBtn size="sm" color="blue" onClick = {this.resetState}>reset</MDBBtn>
                                            </table>
                                            </Grid>
                                        </MuiPickersUtilsProvider>
                                        
                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn color="blue" type="submit" onClick = { (e) => this.onSearch(e)}>
                                                Search
                                            </MDBBtn>
                                        </div>
                                    </form>
                        </MDBContainer>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        appointmentTypes: state.appointmentTypes !== null ? state.appointmentTypes.allAppTypes : null
    }
}

export default connect(mapStateToProps,{getAppointmentTypes, searchAppointment})(AppointmentSearchDialog);