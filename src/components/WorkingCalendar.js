import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import Task from './Task';

import "../App.css";

// must manually import the stylesheets for each plugin
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { MDBContainer } from "mdbreact";

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    taskDialog: false,
    date: ''
 
  };

  toggleTaskDialog = () => {
    this.setState({
        taskDialog: !this.state.taskDialog
    });
    }

  render() {
    return (
     <MDBContainer>
  <FullCalendar
            defaultView="dayGridMonth"
            timeZone='UTC'
            header={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            dateClick={this.handleDateClick}
          />
          
        <Task date={this.state.date} show={this.state.taskDialog} toggle={this.toggleTaskDialog} />
     </MDBContainer>
        
    );
  }

  toggleWeekends = () => {
    this.setState({
      // update a property
      calendarWeekends: !this.state.calendarWeekends
    });
  };

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

  handleDateClick = arg => {
    this.setState({
        taskDialog: !this.state.taskDialog,
        date: arg.date
    });
    
  };
}
