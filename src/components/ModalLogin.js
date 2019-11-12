import React, {Component} from 'react'
import { connect } from 'react-redux'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class ModalLogin extends Component{

    render(){
        return(
    <Modal show={this.props.showLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick = {this.props.closeModalLogin}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      );
    }
}

const mapStateToProps = state => {
    return {
      showLogin: state.showLoginModal, 
    };
};

const mapDispatchToProps = dispatch => {
  return {
      closeModalLogin: () => dispatch({type: 'closeModalLogin'}),
  }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);