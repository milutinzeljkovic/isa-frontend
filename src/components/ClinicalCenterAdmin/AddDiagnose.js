import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { addDiagnose } from '../../actions/diagnose';
import browserHistory from '../../history';


class AddDiagnose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
        };
    }

    handleNameChange = event => {
        this.setState({name: event.target.value});
    }

    handleDescriptionChange = event =>  {
        this.setState({description: event.target.value});
    }
    
    handleOnSubmit = () => {
   
        const datas = {...this.state};
        
        this.props.addDiagnose(datas);
        this.props.toggle();  
        browserHistory.push('/')

    }
    

    render(){
        return(
        <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div style={{ textAlignVertical: "center", textAlign: "center" }}>
                        <h2><strong>New diagnose</strong></h2>
                    </div> 
                </MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={() => this.handleSubmit()}>
                    <div className="grey-text">
                    <MDBInput
                        label="Type name diagnose"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => this.handleNameChange(e)}
                    />
                 
                    <MDBInput
                        label="Type description diagnose"
                        group
                        type="text"
                        validate

                        required

                        onChange={(e) => this.handleDescriptionChange(e)}
                    />
                  
                    </div>
                    <div className="text-center">
                    <MDBBtn onClick = {() => this.handleOnSubmit()}>Add</MDBBtn>
                    <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>
                    </div>
                </form> 
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>





        );

    }
}



export default connect(null, { addDiagnose })(AddDiagnose);