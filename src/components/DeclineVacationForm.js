import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, } from 'mdbreact';
import { connect } from 'react-redux';
import { declineVacationRequest } from '../actions/vacation';

class DeclineVacationForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mailText: ''
       };
    }

    handleMailTextChange = event => {
        this.setState({mailText: event.target.value});
    }


    handleOnSubmit = async (e) => {
        e.preventDefault();
        await this.props.declineVacationRequest(this.props.id,this.state.mailText);
        window.location.reload();
        this.props.toggle();
    }
    

    render(){
        return (
            <MDBContainer>
              <MDBModal isOpen={ this.props.show } toggle={ this.props.toggle }>
                    <MDBModalHeader toggle={ this.props.toggle }/>
                   <MDBModalBody>
                        <form onSubmit = {(e) => this.handleOnSubmit(e)}>
                          <p className="h4 text-center mb-4">Send mail</p>
                          <label htmlFor="defaultFormContactNameEx" className="grey-text">
                            Your message
                          </label>
                          <textarea
                            type="text"
                            id="defaultFormContactMessageEx"
                            className="form-control"
                            rows="3"
                            onChange={(e) => this.handleMailTextChange(e)}
                          />
                          <div className="text-center mt-4">
                            <MDBBtn  onClick = {(e) => this.handleOnSubmit(e)} color="warning" outline type="submit">
                              Send
                              <MDBIcon far icon="paper-plane" className="ml-2" />
                            </MDBBtn>
                          </div>
                        </form>
                  </MDBModalBody>
              </MDBModal>
            </MDBContainer>
          );
    }
}



export default connect(null,{declineVacationRequest})(DeclineVacationForm);