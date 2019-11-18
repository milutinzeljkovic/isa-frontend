import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { login, me } from '../actions/auth';


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
    }

    handleEmailChange = event => {
        this.setState({email: event.target.value});
    }

    handlePasswordChange = event =>  {
        this.setState({password: event.target.value});
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

    }


    handleSubmit = async () =>  {
        const validEmail = RegExp(/.+@.+\.[A-Za-z]+$/);
        let err = false;
        if(this.state.email === '' || !validEmail.test(this.state.email)){
            if(this.state.email === ''){
                this.setState({emailValid: false, emailErrorMessage: 'E-mail can not be empty'});
                err = true;
            }else {
                err = true;
                this.setState({emailValid: false, emailErrorMessage: 'E-mail is not valid'});
            }
        }else {
            this.setState({emailValid: true});
        }

        if(this.state.password === ''){
            err = true;
            this.setState({passwordValid: false});
        }else {
            this.setState({passwordValid: true});
        }
        if(!err){
            let response;
            response = await this.props.login(this.state);
            if(response.type === 'LOGIN'){
                this.props.toggle();                
                this.props.me();
            }
        }
    }

    onCloseModalClick(){        
        this.props.toggle();
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
                        {
                            this.props.auth.loginStatus === null ?
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

                                onChange={(e) => this.handlePasswordChange(e)}
                            />
                            <div className="form-group col " style={{height: '2px', marginBottom: '2rem'}}
			                    hidden={this.state.passwordValid}>
                                <div className="col-sm-11">
                                    <small className="text-danger float-left">Password can not be empty</small>
                                </div>
			                </div>
                            </div>
                            <div className="text-center">
                            <MDBBtn onClick = {() => this.handleSubmit()}>Login</MDBBtn>
                            <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>

                            </div>
                        </form> : <p> {this.props.auth.loginStatus} </p>}
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps,{login, me})(LoginDialog);