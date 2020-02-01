import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { newAppointmentType } from '../../actions/appointmentType';
import browserHistory from '../../history';

class AddAppointmentType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: ''
        };
    }


    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }
    handlePriceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    }

    handleOnSubmit = () => {
        const datas = {...this.state};
        this.props.newAppointmentType(datas);
        this.props.toggle();
        browserHistory.push("/");
    }

    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Add a new appointment type</p>
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
                    label="Type the price"
                    group
                    type="number"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handlePriceChange(e)}
                />
                </div>
                <div className="text-center">
                <MDBBtn onClick = {() => this.handleOnSubmit()} >Add</MDBBtn>
                <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>
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
                            Appointment type
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

export default connect(null, { newAppointmentType })(AddAppointmentType);