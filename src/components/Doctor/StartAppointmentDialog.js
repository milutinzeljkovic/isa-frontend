import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput, MDBModal, MDBModalBody, } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { finishReport } from '../../actions/doctors';

import _ from 'loadsh';



class StartAppointmentDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: '',
            weight: '',
            allergy: '',
            diopter: '',
            blood_type: '',
            medicines: [],
            diagnose: '',
            therapy: '',
        };
    }


    handeDescriptionForMedicineChange = (event, i) => {
        let med = this.state.medicines;
        med[i].info = event.target.value;
        this.setState({ medicines: med })

    }

    handleHeightChange = event => {
        this.setState({ height: event.target.value });
    }

    handleWeightChange = event => {
        this.setState({ weight: event.target.value });
    }
    handleAllergyChange = event => {
        this.setState({ allergy: event.target.value });
    }
    handleDiopterChange = event => {
        this.setState({ diopter: event.target.value });
    }

    handleBloodTypeChange = event => {
        this.setState({ blood_type: event.target.value });
    }
    handleTherapyChange = event => {
        
        this.setState({ therapy: event.target.value });
    }

    handleMedicineChange = (event, value) => {
        this.setState({ medicines: value });


    }
    handleDiagnoseChange = (event, value) => {
        this.setState({ diagnose: value });
    }

    renderMedicines(medicines) {
        let newMedicines = [];

        _.map(medicines, medicine => {
            let newMedicine = {};

            newMedicine.name = medicine.name;
            newMedicine.label = medicine.label;
            newMedicine.info = '';

            newMedicines.push(newMedicine);

        })

        return newMedicines;


    }

    renderDiagnoses(diagnoses) {
        let newDiagnoses = [];

        _.map(diagnoses, diagnose => {
            let newDiagnose = {};

            newDiagnose.name = diagnose.name;
            newDiagnose.label = diagnose.label;

            newDiagnoses.push(newDiagnose);

        })


        return newDiagnoses;


    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        const datas = { ...this.state, appointment_id: this.props.data.id };

        this.props.finishReport(datas);
        this.props.toggle()

    }


    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={this.props.show} toggle={this.props.toggle}>
                    <MDBModalBody>
                        <form onSubmit={(e)=>this.handleOnSubmit(e)}>
                            <label>
                                Medical record
                            </label>
                            <MDBInput
                                label="Height"
                                group
                                type="text"
                                validate

                                required

                                onChange={(e) => this.handleHeightChange(e)}
                            />
                            <MDBInput
                                label="Weight"
                                group
                                type="text"
                                validate

                                required

                                onChange={(e) => this.handleWeightChange(e)}
                            />
                            <MDBInput
                                label="Blood type"
                                group
                                type="text"
                                validate

                                required

                                onChange={(e) => this.handleBloodTypeChange(e)}
                            />
                            <MDBInput
                                label="Diopter"
                                group
                                type="text"
                                validate

                                required

                                onChange={(e) => this.handleDiopterChange(e)}
                            />
                            <MDBInput
                                label="Allergy"
                                group
                                type="text"
                                validate

                                required

                                onChange={(e) => this.handleAllergyChange(e)}
                            />
                            <label>
                                Medical report
                            </label>
                            <Autocomplete
                                multiple
                                options={this.renderMedicines(this.props.medicines)}
                                getOptionLabel={option => option.name}
                                onChange={this.handleMedicineChange}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="standard"

                                        label="Medicines"
                                        placeholder="Medicines"
                                        fullWidth
                                    />
                                )}
                            />
                            {_.isEmpty(this.state.medicines) ? '' :
                                _.map(this.state.medicines, (medicine, index) => {
                                    return (
                                        <MDBInput
                                            key={medicine.label}
                                            label={'Descripton for: ' + medicine.name}
                                            group
                                            id={medicine.label}
                                            type="text"
                                            validate
                                            onChange={(e) => this.handeDescriptionForMedicineChange(e, index)}
                                        />
                                    )


                                })

                            }

                            <Autocomplete
                                id="tags-standard"
                                options={this.renderDiagnoses(this.props.diagnoses)}
                                getOptionLabel={option => option.name}
                                onChange={(event, value) => this.handleDiagnoseChange(event, value)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Diagnoses"
                                        placeholder="Diagnoses"
                                        fullWidth


                                    />
                                )}
                            />
                            <div className="md-form">
                                <label htmlFor="form7">Therapy</label>

                                <textarea id="form7"
                                    className="md-textarea form-control"
                                    rows="3" onChange={(e) => this.handleTherapyChange(e)}
                                ></textarea>
                            </div>
                            <div className="text-center mt-4">
                                <MDBBtn onClick={this.props.toggle} color="danger" outline type="submit">
                                    Close
                                </MDBBtn>
                                <MDBBtn onClick={(e) => this.handleOnSubmit(e)} color="success" outline type="submit">
                                    Start
                                </MDBBtn>
                            </div>
                        </form>

                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}




export default connect(null, { finishReport })(StartAppointmentDialog);