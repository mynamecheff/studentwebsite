$(document).ready(function() {
  $('#calendar').fullCalendar({
    themeSystem: 'bootstrap4',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultView: 'agendaWeek',
    navLinks: true,
    editable: true,
    slotDuration: '00:10:00',
    eventLimit: true,
    events: {
      url: '/api/events',
      type: 'GET',
      data: { calendar_id: 1 },
      failure: function() {
        alert('Error fetching events');
      },
      success: function(response) {
        // Add preset events to the response data
        response.push(
          {
            title: 'DANM & BHAN',
            start: '2023-03-10T09:00:00',
            end: '2023-03-10T12:15:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'DANM & BHAN',
            start: '2023-03-13T09:00:00',
            end: '2023-03-13T16:15:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'DANM',
            start: '2023-03-21T09:00:00',
            end: '2023-03-21T14:30:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'DANM & BHAN',
            start: '2023-03-23T09:00:00',
            end: '2023-03-23T14:30:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'DANM & BHAN',
            start: '2023-03-24T09:00:00',
            end: '2023-03-24T14:30:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'DANM',
            start: '2023-03-27T09:00:00',
            end: '2023-03-27T14:30:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'DANM & BHAN',
            start: '2023-03-28T09:00:00',
            end: '2023-03-28T16:15:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'BHAN',
            start: '2023-03-30T09:00:00',
            end: '2023-03-30T12:15:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          },
          {
            title: 'BHAN',
            start: '2023-03-30T09:00:00',
            end: '2023-03-30T14:30:00',
            backgroundColor: 'red',
            borderColor: 'red',
            undeletable: true
          }
        );
        response.forEach(function(event) {
          if (event.title === 'DAMN') {
            event.color = 'yellow';
          } else if (event.title === 'BHAN') {
            event.color = 'green';
          }
        });
      }
    },    
    // Add a custom event to the calendar on red events
    eventClick: function(event, jsEvent, view) {
      if (event.backgroundColor === "red") {
        const date = event.start;
        const title = prompt('Event Title:');
        if (title) {
          const start = date.format();
          const end = moment(date).add(10, 'minutes').format();
          const duration = 30;
          const calendar_id = 1;
          const eventData = { calendar_id, title, start, end, duration };
          $.ajax({
            url: '/api/events',
            type: 'POST',
            data: eventData,
            success: function(event) {
              $('#calendar').fullCalendar('renderEvent', event, true);
            }
          });
        }
        //to delete event (can't delete red events)
      } else {
        if (confirm("Are you sure you want to delete this event?")) {
          $.ajax({
            url: '/api/events/' + event.id,
            type: 'DELETE',
            data: {
              title: event.title,
              calendar_id: event.calendar_id
            },
            success: function() {
              $('#calendar').fullCalendar('removeEvents', event.id);
            }
          });
        }
      }
    },
    //for making events
    dayClick: function(date, jsEvent, view) {
      const title = prompt('Event Title:');
      if (title) {
        const start = date.format();
        const end = moment(date).add(10, 'minutes').format();
        const duration = 30;
        const calendar_id = 1;
        const color = prompt('Event Color:');
        const eventData = { calendar_id, title, start, end, duration, color };
        $.ajax({
          url: '/api/events',
          type: 'POST',
          data: eventData,
          success: function(event) {
            $('#calendar').fullCalendar('renderEvent', event, true);
          }
        });
      }
    },
    //ability to drag and rezise events
    eventResize: function(event, delta, revertFunc) {
      const start = event.start.format();
      const end = event.end.format();
      $.ajax({
        url: '/api/events/' + event.id,
        type: 'PUT',
        data: { start: start, end: end, calendar_id: event.calendar_id },
        success: function() {
          // The event has been updated in the database
        },
        error: function() {
          // There was an error updating the event in the database
          revertFunc();
        }
      });
    },
    //save when moving events
    eventDrop: function(event, delta, revertFunc) {
      const start = event.start.format();
      const end = event.end.format();
      const title = event.title; // update the title
      $.ajax({
        url: '/api/events/' + event.id,
        type: 'PUT',
        data: { start: start, end: end, title: title, calendar_id: event.calendar_id },
        success: function() {
          // The event has been updated in the database
        },
        error: function() {
          // There was an error updating the event in the database
          revertFunc();
        }
      });
    }
  });
});