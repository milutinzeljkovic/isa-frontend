import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import { addMedicine } from '../../actions/medicine';
import browserHistory from '../../history';


class AddMedicine extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
    }

    handleNameChange = event => {
        this.setState({name: event.target.value});
    }

  
    
    handleOnSubmit = () => {
   
        const datas = {...this.state};
        
        this.props.addMedicine(datas);
        this.props.toggle();  
        browserHistory.push('/')

    }
    

    render(){
        return(
        <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>
                    <div style={{ textAlignVertical: "center", textAlign: "center" }}>
                        <h2><strong>New medicine</strong></h2>
                    </div> 
                </MDBModalHeader>
                <MDBModalBody>
                    <form onSubmit={() => this.handleSubmit()}>
                    <div className="grey-text">
                    <MDBInput
                        label="Type name medicine"
                        group
                        type="text"
                        validate
                        error="wrong"
                        success="right"
                        onChange={(e) => this.handleNameChange(e)}
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



export default connect(null, { addMedicine })(AddMedicine);