require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
  next();
});

app.get('/notes', function(req, res) {
  Note
    .find()
    .then(function(notes) {
      res.json(notes);
    });
});

app.post('/notes', function(req, res) {
  var note = new Note(req.body.note);
  note.save(function (err, note) {
    if (err) return console.error(err);
    res.json({note: note});
  });
});

app.put('/notes/:id', function(req, res) {
  var title = req.body.note.title;
  var body_html = req.body.note.body_html;
  console.log(req.body);
  db.model('Note').findById(req.id, function(err, note) {
    note.update({
      title: title,
      body_html: body_html
    }, function(err) {
      if (err) {
        return console.error(err);
      } else {
        res.json({note: note});
      }
    });
  });
});


app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
