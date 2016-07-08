var router = require('express').Router();
var User = require('../models/user');
var jwt = require('jsonwebtoken');

// READ all users
router.get('/', (req, res) => {
  User
    .find()
    .then((users) => {
      res.json(users);
    });
});

// CREATE a new user
router.post('/', (req, res) => {
  var user = req.body.user;
  if (passwordsPresent(user) && !passwordsMatch(user)) {
    return res.status(422).json({error: 'Passwords do not match'});
  }
  user = new User({
    name: user.name,
    username: user.username,
    password: user.password
  });
  user.save((err, userData) => {
    if (err) return res.json({error: err});
    var token = jwt.sign(userData._id, process.env.JWT_SECRET, {
      expiresIn: 60*60*24
    });
    res.json({
      user: userData,
      authToken: token
    });
  });
});

module.exports = router;

function passwordsPresent(user) {
  return (user.password && user.passwordConfirmation);
}

function passwordsMatch(user) {
  return (user.password === user.passwordConfirmation);
}
