$(document).ready(function() {
  $('#calendar').fullCalendar({
    themeSystem: 'bootstrap4',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    defaultView: 'month',
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events: [
      {
        title: 'Event 1',
        start: '2023-03-08T08:00:00',
        end: '2023-03-08T08:30:00'
      },
      {
        title: 'Event 2',
        start: '2023-03-08T09:00:00',
        end: '2023-03-08T09:30:00'
      }
      // more events here
    ],

    // dayClick function
    dayClick: function(date, jsEvent, view) {
      const title = prompt('Event Title:');
      if (title) {
        $('#calendar').fullCalendar('renderEvent', {
          title: title,
          start: date,
          allDay: true
        });
      }
    }
  });

  // Handle form submission
  $('#add-event-form').on('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get form values
    const title = $('#event-title').val();
    const start = $('#event-start').val();
    const end = $('#event-end').val();

    // Add new event to calendar
    $('#calendar').fullCalendar('renderEvent', {
      title: title,
      start: start,
      end: end
    });

    // Clear form inputs
    $('#event-title').val('');
    $('#event-start').val('');
    $('#event-end').val('');
  });

});
