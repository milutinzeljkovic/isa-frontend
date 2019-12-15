import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import {vacation} from '../actions/auth';


class Task extends Component {
   
    onSubmitHandle = () => {
        const data = {from: this.props.dateStart, to: this.props.dateEnd }
        this.props.vacation(data);  
        this.props.toggle();   

    }

    render() {  
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>Vacation</MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={() => this.handleSubmit()}>

                            <MDBInput
                                require
                                size='lg'
                                type="datetime"
                                name='start'
                                label='From'
                                labelClass='active'
                                disabled
                                valueDefault={this.props.date === '' ? '':this.props.dateStart}

                            />
                            <MDBInput
                                require
                                size='lg'
                                type="datetime"
                                name='end'
                                label='To'
                                labelClass='active'
                                disabled
                                valueDefault={this.props.date === '' ? '':this.props.dateEnd}


                            />
          
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.props.toggle}>Close</MDBBtn>
                        <MDBBtn color="success" onClick = {this.onSubmitHandle}>Add</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default connect(null, {vacation})(Task);