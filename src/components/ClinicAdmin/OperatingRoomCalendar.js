import React, { Component } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from '@fullcalendar/list';

import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import { connect } from 'react-redux';

import _ from 'loadsh';

import "../../App.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import "@fullcalendar/list/main.css";
import "@fullcalendar/list/main.js";

import { MDBContainer } from "mdbreact";
import { getAppointmentsOpRoom,getOperationsOpRoom, getFirstFreeDate } from '../../actions/operatingRoom';
import ChangeDateOfOperation from './ChangeDateOfOperation';

class OperatingRoomCalendar extends Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      showStartAppointmentDialog: false,
      data: {},
      done: '',
      room_id:'',
      operation_id:'',
      dialog:false,
      date:''
    }
  }

  hideStartAppointmentDialog = () => {
    this.setState({
      showStartAppointmentDialog: !this.state.showStartAppointmentDialog
    })
  }

  hideDialog = () => {
    this.setState({
      dialog: !this.state.dialog
    })
  }

  async componentWillMount() {
    await this.props.getAppointmentsOpRoom(this.props.operatingRoom.calendarOpRoom.id);
    await this.props.getOperationsOpRoom(this.props.operatingRoom.calendarOpRoom.id);
    await this.props.getFirstFreeDate(this.props.operatingRoom.calendarOpRoom.id);
  }

  renderList(appointements,operations) {
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

      event.end = date + " " + dateTime;
      events.push(event);

    })

    let event = {};
    if (this.props.operatingRoom.firstFreeDate !== undefined) {
      event.title = 'This date is available for whatever you need!';
      event.color = 'red';
      event.start = new Date(new Date(this.props.operatingRoom.firstFreeDate).getTime() + 60 * 60 * 1000);
      events.push(event);
    }

    return events;

  }

  handleClick = async (info) => {
    console.log(info.event);
    

    if (info.event.backgroundColor === 'red') {
      if (this.props.operatingRoom.operation !== undefined) {
        this.setState({
          dialog: true,
          room_id: this.props.operatingRoom.calendarOpRoom.id,
          operation_id: this.props.operatingRoom.operation.id,
          date: info.event.start

        })

      
      }

    }
  }



  render() {
    return (
      <div>
        <ChangeDateOfOperation operation_id={this.state.operation_id} date={this.state.date} roomId={this.state.room_id} show={this.state.dialog} toggle={this.hideDialog} />

        <MDBContainer>
          {this.props.operatingRoom === null ? <p>Loading</p> : <p><span style={{ fontSize: '20px' }}>Calendar for operating room number {this.props.operatingRoom.calendarOpRoom.number}</span></p>}
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
            events={this.props.operatingRoom === null ? '' : this.renderList(this.props.operatingRoom.operatingRoomAppointments,this.props.operatingRoom.operatingRoomOperations)}
            eventClick={this.handleClick}
          />

        </MDBContainer>

      </div>

    );
  }



}

const mapStateToProps = (state) => {
  return {
    operatingRoom: state.operatingRooms
  }
}


export default connect(mapStateToProps, {getOperationsOpRoom, getAppointmentsOpRoom, getFirstFreeDate })(OperatingRoomCalendar);