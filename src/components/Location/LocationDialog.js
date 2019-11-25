import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';

import GoogleMap from './GoogleMap';
import LocationFinder from './LocationFinder';

class LocationDialog extends Component {
    render() {
        return(
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        <div className="text-center">
                            Add a delivery address
                        </div>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <LocationFinder />
                        <GoogleMap />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    };
}

export default LocationDialog;