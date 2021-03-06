import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';

import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { connect } from 'react-redux';
import { getAppointment } from '../../actions/doctors';
import { getOperations } from '../../actions/doctors';

import { getDataForDoctor } from '../../actions/doctors';
import browserHistory from '../../history';

import _ from 'loadsh';

import "../../App.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/list/main.js";

import { MDBContainer } from "mdbreact";

class WorkingCalendar extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      showStartAppointmentDialog: false,
      data: {},
      done:''
    }
  }

  hideStartAppointmentDialog = () => {
    this.setState({
      showStartAppointmentDialog: !this.state.showStartAppointmentDialog
    })
  }

  async componentWillMount() {
    await this.props.getAppointment();
    await this.props.getOperations();

  }

  renderList(appointements, operations) {
    let events = [];

    _.map(operations, operation => {
      let event = {};

      event.id = operation.id;
      event.title = operation.patient.user.name + " " + operation.patient.user.last_name + " | " + operation.info;
      event.start = operation.date;
      let dateStart = new Date(operation.date);
      let dateEnd = new Date(operation.date);
      dateEnd.setTime(dateStart.getTime() + operation.duration * 60 * 60 * 1000);
      let dateTime = dateEnd.toLocaleTimeString('it-IT').slice(0, 8);
      let date = dateEnd.toISOString().slice(0, 10);
      event.color= 'orange';

      event.end = date + " " + dateTime;
      events.push(event);

    })

    _.map(appointements, appointement => {
      let event = {};

      event.id = appointement.id;
      event.title = appointement.patient.user.name + " " + appointement.patient.user.last_name + " | " + appointement.appointment_type.name;
      event.start = appointement.date;
      let dateStart = new Date(appointement.date);
      let dateEnd = new Date(appointement.date);
      dateEnd.setTime(dateStart.getTime() + appointement.duration * 60 * 60 * 1000);
      let dateTime = dateEnd.toLocaleTimeString('it-IT').slice(0, 8);
      let date = dateEnd.toISOString().slice(0, 10);
      event.color= 'yellow';
      event.end = date + " " + dateTime;
      events.push(event);

    })

    return events;

  }

  handleClick = async (info ) => {    
    if(info.event.backgroundColor==='yellow'){
      await this.props.getDataForDoctor(info.event.id);



    
      browserHistory.push({
      pathname:`/doctor/start-appointment/${info.event.id}`,
      });
    }
    



  }



  render() {
    return (
      <div>
        <MDBContainer>
          <FullCalendar
            defaultView="dayGridMonth"
            timeZone='UTC'
            
            header={{
              left: "prev,next today",
              center: "title",
              right: "listYear,dayGridMonth,timeGridWeek"
            }}
            selectable
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            ref={this.calendarComponentRef}
            events={this.props.doctors === null ? '' : this.renderList(this.props.doctors.doctorAppointments,this.props.doctors.operations)}
            eventClick={ 
                this.handleClick
            }
          />

        </MDBContainer>

      </div>

    );
  }



}

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors,


  }
}


export default connect(mapStateToProps, {getDataForDoctor,getOperations, getAppointment })(WorkingCalendar);