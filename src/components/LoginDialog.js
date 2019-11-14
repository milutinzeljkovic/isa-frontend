import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';

class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailValid: false,
            passwordValid: true,
            emailErrorMessage: ''
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }
    
    handleSubmit(event) {

        alert('A name was submitted: ' + this.state.email);
        event.preventDefault();
    }

    onCloseModalClick(){
        console.log('close');

        this.props.toggle();
    }
    
    onSubmit() { 
        const validEmail = RegExp(/.+@.+\.[A-Za-z]+$/);

        if(this.state.email === '' || !validEmail.test(this.state.email)){
            if(this.state.email === ''){
                this.setState({emailValid: false, emailErrorMessage: 'E-mail can not be empty'});
            }else {
                this.setState({emailValid: false, emailErrorMessage: 'E-mail is not valid'});
            }
        }else {
            this.setState({emailValid: true});
        }

        if(this.state.password === ''){
            this.setState({passwordValid: false});
        }else {
            this.setState({passwordValid: true});
        }

        console.log(this.state.email, this.state.password);
    }

    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div style={{ textAlignVertical: "center", textAlign: "center" }}>
                        <h2><strong>Login</strong></h2>
                    </div> 
                </MDBModalHeader>
                <MDBModalBody>
                        <form onSubmit={this.handleSubmit}>
                            <div className="grey-text">
                            <MDBInput
                                label="Type your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                onChange={this.handleEmailChange}
                            />
                            <div className="form-group col " style={{height: '2px'}}
			                    hidden={this.state.emailValid}>
                                <div className="col-sm-11">
                                    <small className="text-danger float-left">{this.state.emailErrorMessage}</small>
                                </div>
			                </div>
                            <MDBInput
                                label="Type your password"
                                group
                                type="password"
                                validate
                                required
                                onChange={this.handlePasswordChange}
                            />
                            <div className="form-group col " style={{height: '2px', marginBottom: '2rem'}}
			                    hidden={this.state.passwordValid}>
                                <div className="col-sm-11">
                                    <small className="text-danger float-left">Password can not be empty</small>
                                </div>
			                </div>
                            </div>
                            <div className="text-center">
                            <MDBBtn onClick = {this.onSubmit.bind(this)}>Login</MDBBtn>
                            <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>

                            </div>
                        </form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
    }
}

export default LoginDialog;