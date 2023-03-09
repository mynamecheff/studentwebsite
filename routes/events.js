const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

// Open SQLite database connections
const db1 = new sqlite3.Database('./events.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the events database.');
});

const db2 = new sqlite3.Database('./events2.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the events2 database.');
});

const db3 = new sqlite3.Database('./events3.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the events3 database.');
});

// Retrieve all events from the database
router.get('/events', (req, res) => {
  const calendar_id = req.query.calendar_id;
  let db;

  if (calendar_id === '1') {
    db = db1;
  } else if (calendar_id === '2') {
    db = db2;
  } else if (calendar_id === '3') {
    db = db3;
  } else {
    res.status(400).json({ error: 'Invalid calendar ID' });
    return;
  }

  const sql = 'SELECT id, title, start, end, calendar_id FROM events WHERE calendar_id = ? ORDER BY start';
  db.all(sql, [calendar_id], (err, rows) => {
    if (err) {
      throw err;
    }
    res.json(rows);
  });
});

// Create a new event in the database
router.post('/events', (req, res) => {
  const { title, start, end, calendar_id } = req.body;
  let db;

  if (calendar_id === '1') {
    db = db1;
  } else if (calendar_id === '2') {
    db = db2;
  } else if (calendar_id === '3') {
    db = db3;
  } else {
    res.status(400).json({ error: 'Invalid calendar ID' });
    return;
  }

  const sql = 'INSERT INTO events (title, start, end, calendar_id) VALUES (?, ?, ?, ?)';
  db.run(sql, [title, start, end, calendar_id], function(err) {
    if (err) {
      throw err;
    }
    const eventId = this.lastID;
    const event = { id: eventId, title, start, end, calendar_id };
    res.json(event);
  });
});

// Update an event in the appropriate database based on the calendar ID
router.put('/events/:id', (req, res) => {
  const { title, start, end, calendar_id } = req.body;
  const id = req.params.id;
  let db;

  if (calendar_id === '1') {
    db = db1;
  } else if (calendar_id === '2') {
    db = db2;
  } else if (calendar_id === '3') {
    db = db3;
  } else {
    res.status(400).json({ error: 'Invalid calendar ID' });
    return;
  }

  const sql = 'UPDATE events SET title = ?, start = ?, end = ?, calendar_id = ? WHERE id = ?';
  db.run(sql, [title, start, end, calendar_id, id], (err) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Event updated successfully.' });
  });
});

// Delete an event from the database
router.delete('/events/:id', (req, res) => {
  const id = req.params.id;
  const calendar_id = req.body.calendar_id;
  let db;

  if (calendar_id === '1') {
    db = db1;
  } else if (calendar_id === '2') {
    db = db2;
  } else if (calendar_id === '3') {
    db = db3;
  } else {
    res.status(400).json({ error: 'Invalid calendar ID' });
    return;
  }
  const sql = 'DELETE FROM events WHERE id = ?';
  db.run(sql, [id], (err) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Event deleted successfully.' });
  });
});

module.exports = router;

