require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
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
    if (err) return console.error(err);
    console.log(note);
    res.json({note: note});
  });
});

// UPDATE existing note
app.put('/notes/:id', function(req, res) {
  var note = req.body.note;
  db.model('Note')
    .findByIdAndUpdate(note._id, note, {new: true}, function(err, note) {
      if (err) {
        return console.error(err);
      } else {
        res.json({note: note});
      }
    });
});


app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
