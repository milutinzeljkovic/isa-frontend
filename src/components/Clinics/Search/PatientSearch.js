import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { searchPatients } from '../../../actions/patients';

class PatientSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            last_name: '',
            patientID: ''
        };
    }

    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleLastNameChange = (e) => {
        this.setState({
            last_name: e.target.value
        })
    }

    handlePatientIDChange = (e) => {
        this.setState({
            patientID: e.target.value
        })
    }

    handleOnSubmit = () => {
        const datas = {...this.state};
        //this.props.searchPatients(datas);
        this.props.toggle();
    }

    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="grey-text">
                <MDBInput
                    label="Type the name"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleNameChange(e)}
                />
                <MDBInput
                    label="Type the last name"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleLastNameChange(e)}
                />
                <MDBInput
                    label="Type the patients ID"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handlePatientIDChange(e)}
                />
                </div>
                <div className="text-center">
                <MDBBtn onClick = {() => this.handleOnSubmit()} >Add</MDBBtn>
                <MDBBtn outline color="danger" onClick = { this.props.toggle }>Close</MDBBtn>
                </div>
            </form>
        )
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        <div className="text-center">
                            Search patients
                        </div> 
                    </MDBModalHeader>
                    <MDBModalBody>
                            {this.renderModalBodyContent()}
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default connect(null, {searchPatients})(PatientSearch);