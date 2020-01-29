import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import AppointmentSearchDialog from '../Appointments/AppointmentSearchDialog';
import AppointmentSearchResult from '../Appointments/AppointmentSearchResult';

class PatientHomePage extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="4">
                        <AppointmentSearchDialog/>
                    </MDBCol>
                    <MDBCol md="8">
                        <AppointmentSearchResult />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default PatientHomePage;