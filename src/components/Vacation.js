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
    dateStart: '',
    dateEnd: ''

 
  };

  toggleTaskDialog = () => {
    this.setState({
        taskDialog: !this.state.taskDialog
    });
    }

  render() {
    console.log(Date)
    return (
     <MDBContainer>
  <FullCalendar
            defaultView="dayGridMonth"
            timeZone='UTC'
            header={{
              left: "prev,next today",
              center: "title",
              right: ""
            }}
            selectable
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            selectAllow={ function(info) {
              const now = new Date();
              now.setHours(0,0,0,0);
              if (info.start < now )
                  return false;
              return true;          
           }}
            select={this.handleSelectClick}
          />
          
        <Task dateStart={this.state.dateStart} dateEnd={this.state.dateEnd} show={this.state.taskDialog} toggle={this.toggleTaskDialog} />
     </MDBContainer>
        
    );
  }



  handleSelectClick = arg => {     
    this.setState({
      taskDialog: !this.state.taskDialog,
      dateStart: arg.startStr,
      dateEnd: arg.endStr

    });
  }
  

  
}
