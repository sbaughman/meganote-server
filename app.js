require('dotenv').load();
var express = require('express');
var User = require('./models/user');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var noteRoutes = require('./routes/note-routes');
var headersMiddleware = require('./middleware/headers');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware
app.use(headersMiddleware);

// Routes
app.use('/api/v1/notes', noteRoutes);

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
  if (user.password === user.passwordConfirmation) {
    user.save((err, user) => {
      if (err) return res.json({error: err});
      res.json({ user: user });
    });
  }
  else {
    res.json(400, {error: 'Passwords do not match'});
  }
});


app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
});
