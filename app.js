require('dotenv').load();
var express = require('express');
var db = require('mongoose');

// db.connect('mongodb://localhost/app');
var app = express();

var Note = db.model('Note', { title: String });

app.get('/', function(req, res) {
  Note
    .find()
    .then(function(notes) {
      res.json(notes);
    });
});

app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
})
