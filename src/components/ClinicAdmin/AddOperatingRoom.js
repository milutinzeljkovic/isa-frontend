import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { newOpRoom } from '../../actions/operatingRoom';

class AddOperatingRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: ''
        };
    }


    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleNumberChange = (e) => {
        this.setState({
            number: e.target.value
        })
    }

    handleOnSubmit = () => {
        const datas = {...this.state};
        this.props.newOpRoom(datas);
        this.props.toggle();
    }

    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">Add new operation room for your clinic</p>
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
                    label="Type the number"
                    group
                    type="text"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleNumberChange(e)}
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
                            Add operation room
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

export default connect(null, { newOpRoom })(AddOperatingRoom);