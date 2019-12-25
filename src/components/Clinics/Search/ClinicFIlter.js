import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBCardTitle, MDBBadge} from "mdbreact";

import {connect} from 'react-redux';
import ReactStars from 'react-stars'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from 'loadsh';
import { searchClinics } from '../../../actions/clinic';
import { getAppointmentTypes } from '../../../actions/appointmentType';


class ClinicFIlter extends Component {

    constructor(props){
        const date = new Date();
        const m = date.getMonth() +1;
        let c = date.getFullYear() + '-' + m + '-' + date.getDate();
        console.log(c);
        
        super(props);
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 500); 
        this.state = {
            date: null,
            appointment_type: null,
            stars: null,
            startDate: c,
            showFilters: false,
            name: '',
            params: {
                name: null,
                appointment_type: null,
                date: null,
                stars: null
            }
        }
        
    }

    setStateAsync(state) {        
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    componentDidMount = async () => {
        await this.props.getAppointmentTypes();
    }



    ratingChanged = async newRating => {
        if(this.state.stars === newRating){
            await this.setStateAsync({
                stars: null
            })
        }else{
            await this.setStateAsync({
                stars: newRating
            })
        }
        let params = {...this.state};
        this.props.searchClinics(params);

    }

    handleChange = async date => {

        const d = new Date(date.getTime());
        let formatted_date = d.getFullYear() +'-'+(d.getMonth() +1) +'-'+ d.getDate();
        
        if(formatted_date === this.state.date){
            
            await this.setStateAsync({
                date: null
            })
        }else{
            await this.setStateAsync({
                date: formatted_date
            })
        }
        let params = {...this.state};
        this.props.searchClinics(params);


    };
    onAppointmentTypeClick = async type => {
        
        if(type.id === this.state.appointment_type){
            await this.setStateAsync({
                appointment_type: null
            })
        }
        else{
            await this.setStateAsync({
                appointment_type: type.id
            })

        }
        let params = {...this.state};
        this.props.searchClinics(params);
        
    }

    renderAppointmentTypes = (types) => {
        
        return _.map(types, type => {            
            
            return(
                <MDBBadge className= 'app_type_badge'
                    key = {type.id}
                    tag="a"
                    color = {this.state.appointment_type === type.id ? 'default': 'teal'}
                    onClick = {()=> this.onAppointmentTypeClick(type)}
                >
                     {type.name}
                </MDBBadge>
            )
        })
    }

    onChange = event => {        
        this.setStateAsync({ name: event.target.value });
        this.debouncedOnChange(event.target.value);
    }

    debouncedOnChange(value) {
        this.searchByName(value);
    }

    searchByName = value => {
        let params = {...this.state};
        params.name = value;
        this.props.searchClinics(params);
    }


    toggleFilters = () => {         
        this.setState({
            showFilters: !this.state.showFilters
        });
    }

    renderFilters = () => {
        
        return(
            <MDBCardBody>
                <MDBInput
                    label="Clinic name"
                    group
                    type="text"
                    onChange={(e) => this.onChange(e)}
                />
                 <DatePicker
                    onChange={this.handleChange}
                    dateFormat="yyyy-mm-dd"
                    value={this.state.date === null ? this.state.startDate : this.state.date}
                /> 
                <ReactStars
                    count={5}
                    size={24}
                    onChange={ (newRating) => this.ratingChanged(newRating)}
                    value={this.state.stars}
                    color2={'#ffd700'} />
                {
                    this.renderAppointmentTypes(this.props.appointmentTypes)
                }
            </MDBCardBody>
        )
    }

    

    render() {
        return (
            <div>
                <MDBCard id='filter-card'>
                    <MDBCardBody>
                        <MDBCardTitle>
                            <MDBBadge  tag="a" onClick = {this.toggleFilters}>{this.state.showFilters ? 'Hide filters' : 'Show filters'}<i className="fas fa-filter"></i> </MDBBadge>

                        </MDBCardTitle>
                    </MDBCardBody>
                    {
                        this.state.showFilters ? 
                        this.renderFilters()
                        :
                        ''
                    }
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

export default connect(mapStateToProps,{searchClinics, getAppointmentTypes})(ClinicFIlter);