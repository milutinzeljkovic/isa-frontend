import React, { Component } from 'react';
import {  MDBInput, MDBBadge} from "mdbreact";
import ReactStars from 'react-stars'
import DatePicker from "react-datepicker";
import { searchDoctors } from '../../../actions/clinic';
import { filterDoctors } from '../../../actions/doctors';
import {connect} from 'react-redux';
import _ from 'loadsh';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { getAppointmentTypes } from '../../../actions/appointmentType';



class DoctorFilter extends Component {

    constructor(props){
        const date = new Date();
        const m = date.getMonth() +1;
        let c = date.getFullYear() + '-' + m + '-' + date.getDate();
        super(props);
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 500); 
        this.state = {
            name: '',
            date: null,
            appointment_type: null,
            stars: null,
            startDate: c,
            clinic_id: this.props.clinic_id,
            minStars: 0,
            maxStars: 0

        }

    }

    setStateAsync(state) {
        return new Promise((resolve) => {
          this.setState(state, resolve)
        });
    }

    filterResults = () => {
        const filter = {...this.state}
        this.props.filterDoctors(filter);

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
        this.props.searchDoctors(params);

    };


    onChange = event => {
        this.setState({ name: event.target.value });
        this.debouncedOnChange(event.target.value);
    }

    debouncedOnChange(value) {
        this.searchByName(value);
    }

    searchByName = value => {
        let params = {...this.state};
        params.name = value;
        this.props.searchDoctors(params);

    }

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
        this.props.searchDoctors(params);

        
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
        this.props.searchDoctors(params);
        

    }



    minRatingChanged = async stars => {
        await this.setStateAsync({
            minStars: stars
        })
        this.filterResults();
    }

    maxRatingChanged = async stars => {
        await this.setStateAsync({
            maxStars: stars
        })
        this.filterResults();
    }

    

    renderAppointmentTypes = (types) => {
        
        return _.map(types, type => {            
            
            return(
                <MDBBadge className= 'app_type_badge' key = {type.id}
                    tag="a"
                    color = {this.state.appointment_type === type.id ? 'default': 'teal'}
                    onClick = {()=> this.onAppointmentTypeClick(type)}
                >
                     {type.name}
                </MDBBadge>
            )
        })
    }

    render() {
        return (
            <div>
                <Tabs>
                    <TabList>
                        <Tab>Search</Tab>
                        <Tab>Filters</Tab>
                    </TabList>

                    <TabPanel>
                        <table>
                        <tbody>
                        <tr>
                            <td>                
                                <MDBInput
                                    label="Doctor name"
                                    group
                                    type="text"
                                    onChange={(e) => this.onChange(e)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <DatePicker
                                    onChange={this.handleChange}
                                    value={this.state.date === null ? this.state.startDate : this.state.date}

                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {this.renderAppointmentTypes(this.props.appointmentTypes)}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ReactStars
                                    count={5}
                                    size={24}
                                    onChange={ (newRating) => this.ratingChanged(newRating)}
                                    value={this.state.stars}
                                    color2={'#ffd700'} />
                            </td>
                        </tr>
                        </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel>
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    min: 
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    onChange={ (newRating) => this.minRatingChanged(newRating)}
                                    value={this.state.minStars}
                                    color2={'#ffd700'} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    max: 
                                    <ReactStars
                                    count={5}
                                    size={24}
                                    onChange={ (newRating) => this.maxRatingChanged(newRating)}
                                    value={this.state.maxStars}
                                    color2={'#ffd700'} />
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        appointmentTypes: state.appointmentTypes
    }
}

export default connect(mapStateToProps,{getAppointmentTypes, searchDoctors, filterDoctors})(DoctorFilter);