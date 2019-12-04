import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBCardTitle} from "mdbreact";
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import _ from 'loadsh';
import { searchClinics } from '../../../actions/clinic';


class ClinicFIlter extends Component {

    constructor(props){
        super(props);
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 500); 
        this.state = {
            startDate: new Date(),
            showFilters: false,
            currentInput: '',
            params: {}
        }
    }

    handleChange = date => {
        console.log(date.getTime()/1000);
        
        this.setState({
            startDate: date
        });
    };

    onChange = event => {
        this.setState({ currentInput: event.target.value });
        this.debouncedOnChange(event.target.value); 
    }

    debouncedOnChange(value) {
        this.searchByName(value);
    }

    searchByName = value => {
        let params = {...this.state.params};
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
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
            </MDBCardBody>
        )
    }

    

    render() {
        return (
            <div>
                <MDBCard id='filter-card'>
                    <MDBCardBody>
                        <MDBCardTitle>
                            <a href onClick = {this.toggleFilters}>{this.state.showFilters ? 'Hide filters' : 'Show filters'}</a>
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

export default connect(null,{searchClinics})(ClinicFIlter);