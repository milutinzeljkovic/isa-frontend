import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody,MDBInput} from 'mdbreact';
import { connect } from 'react-redux';
import {editOperation} from '../../actions/clinicAdmin';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import _ from 'loadsh';

class AddDoctorsToOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctors: [],
            duration:''
        };
    }

    handleDoctorsChange = (event, value) => {
        this.setState({ doctors: value });


    }

    handleDurationChange = event => {
        this.setState({ duration: event.target.value });
    }

    renderDoctors(doctors) {
       let newDoctors = [];

        _.map(doctors, doctor => {
            let newDoctor = {};

            newDoctor.name = doctor.user.name+' '+doctor.user.last_name;
            newDoctor.id = doctor.id;

            newDoctors.push(newDoctor);

        })

        return newDoctors;


    }


    handleOnSubmit = async (e) => {
        e.preventDefault();
        const datas = { ...this.state, operation_id: this.props.operation_id };

        await this.props.editOperation(datas);
        this.props.toggle();
        window.location.reload();

    }


    render() {
        
        return (
            <MDBContainer>
            <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                <MDBModalBody>
                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <h4>Add doctors to operation</h4>
                    <Autocomplete
                        multiple
                        options={this.renderDoctors(this.props.clinicAdmin.clinicDoctors)}
                        getOptionLabel={option => option.name}
                        onChange={this.handleDoctorsChange}

                        renderInput={params => (
                            <TextField
                                {...params}
                                variant="standard"

                                label="Doctors"
                                placeholder="Doctors"
                                fullWidth
                            />
                        )}
                    />
                       <MDBInput
                    label="Duration of operation"
                    group
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handleDurationChange(e)}
                />
                    <div className="text-center mt-4">
                        <MDBBtn onClick={this.props.toggle} color="danger" outline  >
                            Close
                                </MDBBtn>
                        <MDBBtn onClick={(e) => this.handleOnSubmit(e)} color="success" outline type="submit">
                            Finish
                                </MDBBtn>
                    </div>
                </form>
                </MDBModalBody>
            </MDBModal>
        </MDBContainer>
        );
   
    }
}

const mapStateToProps = (state) => {
    return {
      clinicAdmin: state.clinicAdmin,
    }
  }


export default connect(mapStateToProps, { editOperation })(AddDoctorsToOperation);