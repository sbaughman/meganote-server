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
  var user = new User(req.body.user);
  if (user.password === user.passwordConfirmation) {
    user.save((err, user) => {
      if (err) return res.json({error: err});
      res.json({ user: user });
    });
  }
  else {
    res.status(400).json({error: 'Passwords do not match'});
  }
});

module.exports = router;
