require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
var User = require('./models/user');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS setup
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
  next();
});

// READ all notes
app.get('/notes', function(req, res) {
  Note
    .find()
    .then(function(notes) {
      res.json(notes);
    });
});

// CREATE new note
app.post('/notes', function(req, res) {
  var note = new Note(req.body.note);
  note.save(function (err, note) {
    if (err) return res.json({error: err});
    res.json({note: note});
  });
});

// UPDATE existing note
app.put('/notes/:id', function(req, res) {
  var note = req.body.note;
  Note
    .findByIdAndUpdate(note._id, note, {new: true}, function(err, note) {
      if (err) {
        res.json({error: err});
      } else {
        res.json({note: note});
      }
    });
});

// DELETE a note
app.delete('/notes/:id', function(req, res) {
  Note.findByIdAndRemove(req.params.id, function(err, note) {
    if (err) {
      res.json({error: err});
    } else {
      res.json({note: note});
    }
  });
});

// READ all users
app.get('/users', (req, res) => {
  User
    .find()
    .then((users) => {
      res.json(users);
    });
});

// CREATE a new user
app.post('/users', (req, res) => {
  var user = new User(req.body.user);
  user.save((err, user) => {
    if (err) return res.json({error: err});
    res.json({ user: user });
  });
});


app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
