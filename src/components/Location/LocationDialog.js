import React, { Component } from 'react';
import { MDBContainer, MDBModalBody } from 'mdbreact';

import GoogleMap from './GoogleMap';
import LocationFinder from './LocationFinder';

class LocationDialog extends Component {
    render() {
        return(
            <MDBContainer>
                    <MDBModalBody>
                        <LocationFinder />
                        <GoogleMap />
                    </MDBModalBody>
            </MDBContainer>
        );
    };
}

export default LocationDialog;