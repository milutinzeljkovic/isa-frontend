import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

import GoogleMap from './GoogleMap';
import LocationFinder from './LocationFinder';

class LocationDialog extends Component {
    render() {
        return(
            <MDBContainer>
                    <MDBModalHeader toggle={this.props.toggle}>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <LocationFinder />
                        <GoogleMap />
                    </MDBModalBody>
            </MDBContainer>
        );
    };
}

export default LocationDialog;