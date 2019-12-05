import React, { Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { changePassword,me } from '../actions/auth';
import browserHistory from '../history';

class ChangePassword extends Component{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            new_password: '',
            password_confirmation: '',
            passwordErrorMessage: '',
            oldPassErrorFlag: false,
            newPassErrorFlag: false
        };
    }

    handleNewPasswordChange = event => {
        this.setState({new_password: event.target.value});
    }

    handleOldPasswordChange = event =>  {
        this.setState({password: event.target.value});
    }
    
    handlePasswordConfirmationChange = event =>  {
        this.setState({password_confirmation: event.target.value});
    }

    handleOnSubmit = async () => {
        if(this.state.new_password === this.state.password_confirmation){
          const datas = {...this.state,email:this.props.auth.currentUser.email};
          await this.props.changePassword(datas);
          if(this.props.auth.oldPasswordError === 'Wrong old password'){
            this.setState({
              passwordErrorMessage: this.props.auth.oldPasswordError,
              oldPassErrorFlag: true,
              newPassErrorFlag: false,
            });
          }else {
            this.setState({
              passwordErrorMessage: '',
              oldPassErrorFlag: false,
              newPassErrorFlag: false,
            });
            await this.props.me();
            browserHistory.push('/');
          }
        }else{
            this.setState({
              passwordErrorMessage: 'New passwords do NOT match!',
              newPassErrorFlag: true,
              oldPassErrorFlag: false
            });
        }
        console.log(this.state.passwordErrorMessage);
        console.log(this.state.oldPassErrorFlag);
        console.log(this.state.newPassErrorFlag);
    }

    renderPassError() {
      return (
        <div className="form-group col " style={{height: '2px', marginBottom: '2rem'}}>
          <div className="col-sm-11">
              <small className="text-danger float-left">{this.state.passwordErrorMessage}</small>
          </div>
        </div>
      )
    }
    


    render(){
        return (
            <MDBContainer >
              <MDBRow>
                <MDBCol md="6">
                  <form>
                    <p className="h4 text-center mb-4">Change password</p>
                    <div className="grey-text">
                      <MDBInput
                        label="Type your old password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => this.handleOldPasswordChange(e)}

                      />
                      <MDBInput
                        label="Type your new password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        onChange={(e) => this.handleNewPasswordChange(e)}

                      />
                        <MDBInput
                        label="Confirmn your new password"
                        icon="lock"
                        group
                        type="password"
                        validate
                        onChange={(e) => this.handlePasswordConfirmationChange(e)}

                      />
                      {this.state.newPassErrorFlag || this.state.oldPassErrorFlag ? this.renderPassError() : ''}
                      
                    </div>
                    <div className="text-center">
                      <MDBBtn onClick = {() => this.handleOnSubmit()}>Submit</MDBBtn>
                    </div>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          );



    }

}
const mapStateToProps = (state) =>{
    return{
        auth: state.auth,
        oldPasswordError: state.oldPasswordError
    }
}

export default connect(mapStateToProps,{changePassword, me})(ChangePassword);