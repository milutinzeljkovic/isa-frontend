import React, { Component } from 'react';
import { MDBCard, MDBCardBody,  MDBCardTitle, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,  MDBContainer, MDBBtn} from "mdbreact";
import DatePicker from "react-datepicker";

class AppointmentSearchDialog extends Component {

    constructor(props){
        super(props);
        this.state = {
            startDate: new Date()
        }
    }

    render() {
        return (
            <div id = 'appointment-search'>
                <MDBCard>
                    <MDBCardBody>
                            <MDBCardTitle>
                                Reserve in one click
                            </MDBCardTitle>
                        <MDBContainer>
                                    <form>
                                        <div className = "text-left py-4 mt-3">
                                            <MDBDropdown>
                                                <MDBDropdownToggle caret outline color="teal">
                                                    Type
                                                </MDBDropdownToggle>
                                                <MDBDropdownMenu basic>
                                                    <MDBDropdownItem>Tip pregleda 1</MDBDropdownItem>
                                                    <MDBDropdownItem>Tip pregleda 2</MDBDropdownItem>
                                                    <MDBDropdownItem>Tip pregleda 3</MDBDropdownItem>
                                                    <MDBDropdownItem>Tip pregleda 4</MDBDropdownItem>
                                                </MDBDropdownMenu>
                                            </MDBDropdown>
                                            <DatePicker
                                                selected={this.state.startDate}
                                            />
                                        </div>
                                        <div className="text-center py-4 mt-3">
                                            <MDBBtn color="teal" type="submit">
                                                Search
                                            </MDBBtn>
                                        </div>
                                    </form>
                        </MDBContainer>
                    </MDBCardBody>
                </MDBCard>
            </div>
        );
    }
}

export default AppointmentSearchDialog;