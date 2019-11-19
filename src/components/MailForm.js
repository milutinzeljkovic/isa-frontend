import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { declineRegistration } from '../actions/patients';

class MailForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mailText: '',
       };
    }

    handleMailTextChange = event => {
        this.setState({mailText: event.target.value});
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.declineRegistration(this.props.id,this.state.mailText);
        this.props.hideMessageBox()
        
    }
    

    render(){
        return (
            <MDBContainer >
              <MDBRow>
                <MDBCol md="6">
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
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          );
    }
}

const mapStateToProps = (state) => {
    return {
        declineReg: state.declineReg
    }
  }
  

export default connect(mapStateToProps,{declineRegistration})(MailForm);