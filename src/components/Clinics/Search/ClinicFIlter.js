import React, { Component } from 'react';
import { MDBCard, MDBListGroup, MDBListGroupItem, MDBBtn, MDBCardBody, MDBInput} from "mdbreact";
import {connect} from 'react-redux';
import _ from 'loadsh';
import { searchClinics } from '../../../actions/clinic';


class ClinicFIlter extends Component {

    constructor(props){
        super(props);
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 500); 
        this.state = {
            showFilters: false,
            currentInput: '',
            params: {}
        }
    }

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
            </MDBCardBody>
        )
    }

    

    render() {
        return (
            <div>
                <MDBCard>
                    <MDBBtn onClick = {this.toggleFilters}>{this.state.showFilters ? 'Hide filters' : 'Show filters'}</MDBBtn>
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