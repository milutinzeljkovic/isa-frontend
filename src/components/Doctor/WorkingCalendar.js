import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';

import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { connect } from 'react-redux';
import { getAppointment } from '../../actions/doctors';
import { getMedicines } from '../../actions/medicines';
import { getDiagnoses } from '../../actions/diagnose';

import _ from 'loadsh';

import "../../App.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/list/main.js";

import { MDBContainer } from "mdbreact";
import StartAppointmentDialog from './StartAppointmentDialog';

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
    await this.props.getMedicines();
    await this.props.getDiagnoses();

  }

  renderList(appointements) {
    let events = [];

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

      event.end = date + " " + dateTime;
      events.push(event);

    })

    return events;

  }

  handleClick = (info ) => {
    this.setState({
      data: info.event,
      showStartAppointmentDialog: true,
      done: this.props.doctors.doctorAppointments.done
    })

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
            events={this.props.doctors === null ? '' : this.renderList(this.props.doctors.doctorAppointments)}
            eventClick={this.handleClick}
          />

        </MDBContainer>
        <StartAppointmentDialog diagnoses={this.props.diagnoses} medicines={this.props.medicines} data={this.state.data} show={this.state.showStartAppointmentDialog} toggle={this.hideStartAppointmentDialog} />

      </div>

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


export default connect(mapStateToProps, {getMedicines,getDiagnoses, getAppointment })(WorkingCalendar);