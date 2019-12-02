import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MDBCol, MDBInput } from "mdbreact";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

import { getSuggestedLocations, selectLocation, resetSuggestedLocations } from '../../actions/location';

class LocationFinder extends React.Component {

    constructor(props) {
        super(props);     
        // debouncing function to 500ms and binding this
        this.debouncedOnChange = _.debounce(this.debouncedOnChange.bind(this), 500); 
        this.state={
            currentInput: ''
        }
    }
     
    onChange = event => {
        // sending only the values not the entire event
        this.setState({ currentInput: event.target.value });
        this.debouncedOnChange(event.target.value); 
    }

    debouncedOnChange(value) {
        // perform a search only once every 500ms
        this.search(value);
    }

    search(value) {
        // fetch objects from backend
        if(value!=='') {
            this.props.getSuggestedLocations(value);
        };
    }

    setMap(result){
        if(result.geometry.location !== undefined) {
            this.props.resetSuggestedLocations();
            this.setState({ currentInput: result.formatted_address });
            this.props.selectLocation(result);
        }   
    }

    renderList(results){
        return _.map(results, result => {
            return( 
                <MDBListGroupItem href="" key={result.formatted_address} onClick = {() => this.setMap(result)}>
                    {result.formatted_address}
                </MDBListGroupItem> 
            );    
        });
    };
    
    render() {
        return (
            <MDBCol md="6">
                    <MDBInput icon='search' label='Enter location' onChange={this.onChange} type="text" placeholder="Enter location" aria-label="Search" value={this.state.currentInput} />
                    <MDBContainer style={{maxheight: "200px"}}>
                        <MDBListGroup style={{}}>
                            {this.renderList(this.props.suggestedLocations)}
                        </MDBListGroup>
                    </MDBContainer>
            </MDBCol>
        );
    };
}

function mapStateToProps(state){
    return{
        suggestedLocations: state.suggestedLocations
    }
}


export default connect(mapStateToProps,{ getSuggestedLocations, selectLocation, resetSuggestedLocations })(LocationFinder);