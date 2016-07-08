require('dotenv').load();
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var noteRoutes = require('./routes/note-routes');
var userRoutes = require('./routes/user-routes');
var headersMiddleware = require('./middleware/headers');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use(headersMiddleware);

// Routes
app.use('/api/v1/notes', noteRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
