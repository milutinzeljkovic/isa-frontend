import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody,MDBInput} from 'mdbreact';
import { connect } from 'react-redux';
import {addDuration} from '../../actions/clinicAdmin';

class AddDurationOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            duration:''
        };
    }



    handleDurationChange = event => {
        this.setState({ duration: event.target.value });
    }

  

    handleOnSubmit = async (e) => {
        e.preventDefault();
        const datas = { ...this.state, operation_id: this.props.operation_id };

        await this.props.addDuration(datas);
        this.props.toggle();
        window.location.reload();

    }


    render() {
        
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalBody>
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <h4>Add duration of operation</h4>
                   
                       <MDBInput
                    label="Duration of operation"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleDurationChange(e)}
                />
                    <div className="text-center mt-4">
                        <MDBBtn onClick={this.props.toggle} color="danger" outline  >
                            Close
                                </MDBBtn>
                        <MDBBtn onClick={(e) => this.handleOnSubmit(e)} color="success" outline type="submit">
                            Finish
                                </MDBBtn>
                    </div>
                </form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
   
    }
}



export default connect(null, { addDuration })(AddDurationOperation);