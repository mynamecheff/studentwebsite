import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';

const calendarEl = document.getElementById('calendar');

const calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin, timeGridPlugin, bootstrapPlugin ],
  themeSystem: 'bootstrap',
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },
  events: [
    // your events data here
  ],
  selectable: true,
  select: function(info) {
    // handle date range selection here
  },
  editable: true,
  eventDrop: function(info) {
    // handle event drag and drop here
  },
  eventResize: function(info) {
    // handle event resizing here
  },
  dayClick: function(date, jsEvent, view) {
    var title = prompt('Event Title:');
    var eventData;
    if (title) {
      eventData = {
        title: title,
        start: date,
        end: moment(date).add(30, 'minutes') // default duration is 30 minutes
      };
      $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
    }
  }    
});

calendar.render();
