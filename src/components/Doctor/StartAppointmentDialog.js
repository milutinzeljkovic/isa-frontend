import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBInput } from 'mdbreact';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import { finishReport } from '../../actions/doctors';
import browserHistory from '../../history';
import { getMedicines } from '../../actions/medicines';
import { getDiagnoses } from '../../actions/diagnose';
import SheduleAnOperation from './SheduleAnOperation';

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
            diagnose: {},
            therapy: '',
            done: false,
            sheduleAnOperationDialog: false,
            scheduleAnAppointmentDialog: false
        };

    }

    toggleSheduleAnOperationDialog = () => {

        this.setState({
            sheduleAnOperationDialog: !this.state.sheduleAnOperationDialog
        });
    }

    toggleScheduleAnAppointmentDialog = () => {

        this.setState({
            scheduleAnAppointmentDialog: !this.state.scheduleAnAppointmentDialog
        });
    }

    async componentWillMount() {
        await this.props.getMedicines();
        await this.props.getDiagnoses();

        if (this.props.doctors.dataForDoctor.medical_record === undefined) {
            if (this.props.doctors.dataForDoctor.height !== null)
                this.setState({
                    height: this.props.doctors.dataForDoctor.height
                })
            if (this.props.doctors.dataForDoctor.weight !== null)
                this.setState({
                    weight: this.props.doctors.dataForDoctor.weight
                })
            if (this.props.doctors.dataForDoctor.blood_type !== null)
                this.setState({
                    blood_type: this.props.doctors.dataForDoctor.blood_type
                })
            if (this.props.doctors.dataForDoctor.diopter !== null)
                this.setState({
                    diopter: this.props.doctors.dataForDoctor.diopter
                })
            if (this.props.doctors.dataForDoctor.allergy !== null)
                this.setState({
                    allergy: this.props.doctors.dataForDoctor.allergy
                })


        } else {


            if (this.props.doctors.dataForDoctor.medical_record.height !== null)
                this.setState({
                    height: this.props.doctors.dataForDoctor.medical_record.height
                })
            if (this.props.doctors.dataForDoctor.medical_record.weight !== null)
                this.setState({
                    weight: this.props.doctors.dataForDoctor.medical_record.weight
                })
            if (this.props.doctors.dataForDoctor.medical_record.blood_type !== null)
                this.setState({
                    blood_type: this.props.doctors.dataForDoctor.medical_record.blood_type
                })
            if (this.props.doctors.dataForDoctor.medical_record.diopter !== null)
                this.setState({
                    diopter: this.props.doctors.dataForDoctor.medical_record.diopter
                })
            if (this.props.doctors.dataForDoctor.medical_record.allergy !== null)
                this.setState({
                    allergy: this.props.doctors.dataForDoctor.medical_record.allergy
                })
            if (this.props.doctors.dataForDoctor.information !== null)
                this.setState({
                    therapy: this.props.doctors.dataForDoctor.information
                })

            let diag = this.state.diagnose;

            diag.name = this.props.doctors.dataForDoctor.diagnose.name;
            diag.label = this.props.doctors.dataForDoctor.diagnose.label;

            this.setState({ diagnose: diag })

            let med = this.state.medicines;
            _.map(this.props.doctors.dataForDoctor.prescriptions, pres => {
                let newMed = {};

                newMed.name = pres.medicine.name;
                newMed.label = pres.medicine.label;
                newMed.info = pres.info;
                med.push(newMed);

            })
            this.setState({
                medicines: med,
            })
            if (this.props.doctors.dataForDoctor.appointment.done === 1)
                this.setState({
                    done: true,
                })


        }

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

    previousPage() {

        browserHistory.push('/home');

    }

    handleOnSubmit = (e) => {
        e.preventDefault();

        let app_id = this.props.location.pathname.split('/')[3]

        const datas = { ...this.state, appointment_id: app_id };

        this.props.finishReport(datas);
        browserHistory.push('/home');
    }




    render() {
        return (
            <MDBContainer>
                <SheduleAnOperation appointment_id={ this.props.location.pathname.split('/')[3]} show={this.state.sheduleAnOperationDialog} toggle={this.toggleSheduleAnOperationDialog} />

                <form onSubmit={(e) => this.handleOnSubmit(e)}>
                    <label>
                        Medical record
                            </label>
                    <MDBInput
                        label="Height"
                        group
                        type="text"
                        validate
                        required
                        value={this.state.height}
                        onChange={(e) => this.handleHeightChange(e)}
                    />
                    <MDBInput
                        label="Weight"
                        group
                        type="text"
                        validate

                        required
                        value={this.state.weight}

                        onChange={(e) => this.handleWeightChange(e)}
                    />
                    <MDBInput
                        label="Blood type"
                        group
                        type="text"
                        validate

                        required
                        value={this.state.blood_type}

                        onChange={(e) => this.handleBloodTypeChange(e)}
                    />
                    <MDBInput
                        label="Diopter"
                        group
                        type="text"
                        validate

                        required
                        value={this.state.diopter}


                        onChange={(e) => this.handleDiopterChange(e)}
                    />
                    <MDBInput
                        label="Allergy"
                        group
                        type="text"
                        validate

                        required
                        value={this.state.allergy}

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
                        defaultValue={this.state.medicines}
                        disabled={this.state.done}

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
                                    disabled={this.state.done}

                                    value={medicine.info}
                                    onChange={(e) => this.handeDescriptionForMedicineChange(e, index)}
                                />
                            )


                        })

                    }
                    {
                        this.state.done === false ?

                            <Autocomplete
                                options={this.renderDiagnoses(this.props.diagnoses)}
                                getOptionLabel={option => option.name}
                                onChange={(event, value) => this.handleDiagnoseChange(event, value)}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Diagnose"
                                        placeholder="Diagnose"
                                        fullWidth


                                    />
                                )}
                            /> :
                            <MDBInput
                                label="Diagnose"
                                group
                                type="text"
                                validate
                                disabled
                                required
                                value={this.state.diagnose.name}

                                onChange={(e) => this.handleTherapyChange(e)}
                            />
                    }


                    <MDBInput
                        label="Therapy"
                        group
                        type="text"
                        validate
                        disabled={this.state.done}
                        required
                        value={this.state.therapy}

                        onChange={(e) => this.handleTherapyChange(e)}
                    />
                    <MDBBtn disabled={this.state.done} onClick = {this.toggleScheduleAnAppointmentDialog}
                        color="info" outline  >
                        Zakazi pregled
                                </MDBBtn>
                    <MDBBtn   onClick = {this.toggleSheduleAnOperationDialog}
                        color="info" outline  >
                        Zakazi operaciju
                                </MDBBtn>
                    <div className="text-center mt-4">
                        <MDBBtn onClick={this.previousPage} color="danger" outline  >
                            Close
                                </MDBBtn>
                        <MDBBtn onClick={(e) => this.handleOnSubmit(e)} color="success" outline type="submit">
                            Finish
                                </MDBBtn>
                    </div>
                </form>

            </MDBContainer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        doctors: state.doctors,
        medicines: state.medicines,
        diagnoses: state.diagnoses

    }
}


export default connect(mapStateToProps, { getMedicines, getDiagnoses, finishReport })(StartAppointmentDialog);