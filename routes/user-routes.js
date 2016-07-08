var router = require('express').Router();
var User = require('../models/user');

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
  user.save((err, user) => {
    if (err) return res.json({error: err});
    res.json({ user: user });
  });
});

module.exports = router;

function passwordsPresent(user) {
  return (user.password && user.passwordConfirmation);
}

function passwordsMatch(user) {
  return (user.password === user.passwordConfirmation);
}
