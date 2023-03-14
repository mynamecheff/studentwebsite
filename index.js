const express = require('express');
const app = express();
const eventsRouter = require('./routes/events');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// Set up session middleware
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', eventsRouter);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle login page route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Validate username and password securely
  const secureUsernames = ['root', 'Kevin', 'Malene', 'Bo', 'Dan', 'CAHD'];
  const securePasswords = ['dirb', 'python', 'scrum', 'Arduino', 'inductor', 'CTF'];
  const index = secureUsernames.indexOf(username);
  if (index >= 0 && securePasswords[index] === password) {
    // Set user session data
    req.session.user = {
      username: username,
      isAdmin: true
    };
    res.redirect('/admin');
  } else {
    res.send('Invalid username or password');
  }
});

// Handle admin page route
app.get('/admin', (req, res) => {
  // Check if user is logged in and isAdmin
  if (req.session.user && req.session.user.isAdmin) {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
  } else {
    res.redirect('/login');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
