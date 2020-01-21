import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllDoctors } from '../../actions/clinicAdmin';
import {getAppointmentTypes} from '../../actions/appointmentType';
import { getAllOpRooms } from '../../actions/operatingRoom';

class ClinicAdminHomePage extends Component {


  componentWillMount() {
    this.props.getAllDoctors();
    this.props.getAppointmentTypes();
    this.props.getAllOpRooms();
  }


  renderHomePage(){
      return(
        <section>
      
          <h3 className="font-weight-bold text-center dark-grey-text pb-2">Welcome { this.props.auth.currentUser.name}</h3>
          <hr className="w-header my-4"></hr>
          <p className="lead text-center text-muted pt-2 mb-5">Here are some of your basic functionalities, others will be found in your navbar</p>
      
          <div className="row">
      
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="card text-center bg-success text-white">
                <div className="card-body">
                  <p className="mt-4 pt-2"><i className="far fa-object-ungroup fa-4x"></i></p>
                  <h5 className="font-weight-normal my-4 py-2"><Link className="text-white" to="/clinic-admin/all-doctors">Clinic doctors</Link></h5>
                  <p className="mb-4">See all the doctors in the clinic that you run</p>
                </div>
              </div>
            </div>
      
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="card text-center">
                <div className="card-body">
                  <p className="mt-4 pt-2"><i className="fas fa-calendar-alt fa-4x grey-text"></i></p>
                  <h5 className="font-weight-normal my-4 py-2"><Link className="text-black" to="/clinic-admin/all-appointment-types" style={{color:'black'}}>Types of appointments</Link></h5>
                  <p className="text-muted mb-4">See all the appointment types that exist</p>
                </div>
              </div>
            </div>
      
            <div className="col-md-6 col-xl-4 mb-4">
              <div className="card text-center blue lighten-1 text-white">
                <div className="card-body">
                  <p className="mt-4 pt-2"><i className="fas fa-syringe fa-4x"></i></p>
                  <h5 className="font-weight-normal my-4 py-2"><Link className="text-white" to="/clinic-admin/all-operating-rooms">Operating rooms</Link></h5>
                  <p className="mb-4">See all operating rooms in the clinic</p>
                </div>
              </div>
            </div>
      
          </div>
      
        </section>
      );
  }


  render() {
    return (
        <div className="container my-5">
            {this.renderHomePage()}
        </div>
   

    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    clinicAdmin: state.clinicAdmin,
    operatingRooms: state.operatingRooms,
    appointmentTypes: state.appointmentTypes
  }
}

export default connect(mapStateToProps, {getAllDoctors, getAllOpRooms, getAppointmentTypes})(ClinicAdminHomePage);