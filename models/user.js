var db = require('../config/db');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

var UserSchema = db.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.pre('update', function(next) {
  this.updated_at = Date.now();
  next();
});

var User = db.model('User', UserSchema);

module.exports = User;
