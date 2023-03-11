const express = require('express');
const app = express();
const eventsRouter = require('./routes/events');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', eventsRouter);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});


/*
const express = require('express');
const app = express();
const eventsRouter = require('./routes/events');
app.use('/api', eventsRouter);

// Serve static files from the public directory
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
  });

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
}); */