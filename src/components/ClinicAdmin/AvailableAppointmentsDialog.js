import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody , MDBModalHeader, MDBInput, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import { getAllDoctors } from '../../actions/clinicAdmin';
import _ from 'loadsh';

class AvailableAppointmentsDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doctor: '',
            facility: '',
            price: '',
            date: '',
            time: '',
            app_type: 'regularCheckUp'
        };
    }

    componentDidMount(){
        console.log("2");
        this.props.getAllDoctors();
        //this.props.fetchAllOpRooms();
    }

    handleDoctorChange = (e) => {
        this.setState({
            doctor: e.target.value
        })
    }

    handleFacilityChange = (e) => {
        this.setState({
            facility: e.target.value
        })
    }

    handlePriceChange = (e) => {
        this.setState({
            price: e.target.value
        })
    }    

    handleDateChange = (date) => {
        this.setState({
            date: date 
        })
    }

    handleTimeConfirmationChange = (e) => {
        this.setState({
            time: e.target.value
        })
    }

    handleAppTypeChange = (e) => {
        this.setState({
            app_type: e.target.value
        })
    }

    handleOnSubmit = () => {
        //this.props.defineAppointment(this.state);
        this.props.toggle();
    }

    renderDoctorOptions(doctors){   
        return _.map(doctors, doctor => {
          return(
            <option key={doctor.user.id} value={doctor.user.email}>{doctor.user.name} {doctor.user.last_name}</option>
          )
        })
    
    }


    renderModalBodyContent = () => {
        return(
            <form onSubmit={this.handleSubmit}>
                <p className="h5 text-center mb-4">New appointment</p>
                <div className="grey-text">
                <label htmlFor="selectAppType">Choose appointment type</label>
                <select name="selectAppType" className="browser-default custom-select" onChange={(e) => this.handleAppTypeChange(e)}>
                    <option value="regularCheckUp">Check up</option>
                    <option value="operation">Operation</option>
                </select>
                <label htmlFor="selectDate">Choose a date</label>
                <div style={{marginBottom:"10px"}}>
                <DateTimePicker name="selectDate" value={this.state.date} onChange={(e) => this.handleDateChange(e)}/>
                </div>
                <label htmlFor="select1">Choose facility</label>
                <select name="select1" className="browser-default custom-select" onChange={(e) => this.handleFacilityChange(e)}>
                    
                </select>
                <label htmlFor="select12">Choose your doctor</label>
                <select name="select12" className="browser-default custom-select" onChange={(e) => this.handleDoctorChange(e)}>
                { this.doctors === null ? '' : this.renderDoctorOptions(this.props.clinicAdmin)}
                </select>
                <MDBInput
                    label="Type the cost of the checkup"
                    group
                    type="email"
                    validate
                    error="wrong"
                    success="right"
                    onChange={(e) => this.handlePriceChange(e)}
                />
                </div>
                <div className="text-center">
                <MDBBtn onClick = {() => this.handleOnSubmit()} >Add</MDBBtn>
                <MDBBtn outline color="danger" onClick = { this.props.toggle}>Close</MDBBtn>
                </div>
            </form>
        )
    }

    render() {
        return (
            <MDBContainer>
                <MDBModal isOpen={ this.props.show } toggle={this.props.toggle}>
                    <MDBModalHeader toggle={this.props.toggle}>
                        <div className="text-center">
                            Define new available appointment
                        </div> 
                    </MDBModalHeader>
                    <MDBModalBody>
                            {this.renderModalBodyContent()}
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

const mapStateToProps = (state)=> {
    return{
        clinicAdmin: state.clinicAdmin,
    }
}



export default connect(mapStateToProps,{getAllDoctors})(AvailableAppointmentsDialog);