require('dotenv').load();
var express = require('express');
var db = require('./config/db');
var Note = require('./models/note')

var app = express();

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
