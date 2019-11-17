import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { login } from '../actions/auth';


class LoginDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = event =>  {
        this.setState({password: event.target.value});
    }
    
    handleSubmit = () =>  {
        this.props.login(this.state);
    }

    onCloseModalClick(){        
        this.props.toggle();
    }
    
    render() {
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div className="text-center">
                        Log in to MedSoft
                    </div> 
                </MDBModalHeader>
                <MDBModalBody>
                        <form onSubmit={() => this.handleSubmit()}>
                            <p className="h5 text-center mb-4">Sign in</p>
                            <div className="grey-text">
                            <MDBInput
                                label="Type your email"
                                group
                                type="email"
                                validate
                                error="wrong"
                                success="right"
                                onChange={(e) => this.handleEmailChange(e)}
                            />
                            <MDBInput
                                label="Type your password"
                                group
                                type="password"
                                validate
                                onChange={(e) => this.handlePasswordChange(e)}
                            />
                            </div>
                            <div className="text-center">
                            <MDBBtn onClick = {() => this.handleSubmit()}>Login</MDBBtn>
                            <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>

                            </div>
                        </form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
    }
}

export default connect(null,{login})(LoginDialog);