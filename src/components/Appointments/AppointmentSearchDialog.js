import React, { Component } from 'react';
import { MDBCard, MDBCardBody,  MDBCardTitle, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,  MDBContainer, MDBBtn} from "mdbreact";
import DatePicker from "react-datepicker";
import { connect } from 'react-redux';
import { getAppointmentTypes } from '../../actions/appointmentType';
import { searchAppointment } from '../../actions/appointment';
import _ from 'loadsh';

class AppointmentSearchDialog extends Component {

    constructor(props){
        const date = new Date();
        const m = date.getMonth() +1;
        let c = date.getFullYear() + '-' + m + '-' + date.getDate();
        console.log(c);
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
        console.log(params);
        
        this.props.searchAppointment(params)
    }

    renderAppointmentTypes = appointmentTypes => {
        return _.map(appointmentTypes, type=>{
            return(
                <MDBDropdownItem key ={type.id} onClick = { () => this.onTypeSelect(type)}>{type.name}</MDBDropdownItem>

            )
        })
    }

    render() {
        return (
            <div id = 'appointment-search'>
                <MDBCard>
                    <MDBCardBody>
                            <MDBCardTitle>
                                Reserve in one click
                            </MDBCardTitle>
                        <MDBContainer>
                                    <form>
                                        <div className = "text-left py-4 mt-3">
                                            <MDBDropdown>
                                                <MDBDropdownToggle caret outline color="teal">
                                                    Type
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu basic>
                                                    {this.renderAppointmentTypes(this.props.appointmentTypes)}
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                            <DatePicker
                                                value={this.state.selectedDate === null ? this.state.startDate : this.state.selectedDate}
                                                onChange = { (date) => this.onDateSelect(date)}
                                            />
                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn color="teal" type="submit" onClick = { (e) => this.onSearch(e)}>
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
        appointmentTypes: state.appointmentTypes
    }
}

export default connect(mapStateToProps,{getAppointmentTypes, searchAppointment})(AppointmentSearchDialog);