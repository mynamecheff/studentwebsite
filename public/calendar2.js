$(document).ready(function() {
    $('#calendar').fullCalendar({
      themeSystem: 'bootstrap4',
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'month',
      navLinks: true,
      editable: true,
      eventLimit: true,
      events: [
        {
          title: 'Event 1',
          start: '2023-03-08T08:00:00',
          end: '2023-03-08T08:30:00'
        },
        {
          title: 'Event 2',
          start: '2023-03-10T09:00:00',
          end: '2023-03-10T10:30:00'
        }
      ]
    });
  });
  