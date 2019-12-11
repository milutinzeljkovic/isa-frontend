import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';


class Task extends Component {
   

    render() {  
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>Task</MDBModalHeader>
                    <MDBModalBody>
                        <form onSubmit={() => this.handleSubmit()}>
                            <MDBInput
                                size="lg"
                                label="Title"
                                group
                                type="text"
                                validate
                                error="wrong"
                                success="right"
                            />
                            <MDBInput 
                                type="textarea" 
                                label="Description" 
                                rows="3" 
                            />

                            <MDBInput
                                require
                                size='lg'
                                type="datetime-local"
                                name='start'
                                label='Start'
                                labelClass='active'
                                min={this.props.date === ''? '':this.props.date.toISOString().split('.')[0]}
                                valueDefault={this.props.date === '' ? '':this.props.date.toISOString().split('.')[0]}

                            />
                            <MDBInput
                                require
                                size='lg'
                                type="datetime-local"
                                name='end'
                                label='End'
                                labelClass='active'
                                valueDefault={this.props.date === '' ? '':this.props.date.toISOString().split('.')[0]}


                            />
          
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="primary" onClick={this.props.toggle}>Close</MDBBtn>
                        <MDBBtn color="success">Add</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default Task;