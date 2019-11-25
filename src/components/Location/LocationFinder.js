import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

//import { getSuggestedLocations, selectLocation, resetSuggestedLocations } from '../../actions/locations';

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
       //     this.props.getSuggestedLocations(value);
        };
    }

    setMap(result){
        if(result.geometry.location !== undefined) {
            this.props.resetSuggestedLocations();
            this.setState({ currentInput: result.formatted_address });
            this.props.selectLocation(result.geometry.location);
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
                <MDBFormInline className="md-form">
                    <MDBIcon icon="search" />
                    <input className="form-control form-control-sm ml-3 w-75" onChange={this.onChange} type="text" placeholder="Enter location" aria-label="Search" value={this.state.currentInput} />
                    <MDBContainer style={{maxheight: "200px"}}>
                        <MDBListGroup style={{}}>
                            {this.renderList(this.props.suggestedLocations)}
                        </MDBListGroup>
                    </MDBContainer>
                </MDBFormInline>
            </MDBCol>
        );
    };
}

function mapStateToProps(state){
    return{
        suggestedLocations: state.suggestedLocations
    }
}


export default connect(null/*,{ getSuggestedLocations, selectLocation, resetSuggestedLocations }*/)(LocationFinder);