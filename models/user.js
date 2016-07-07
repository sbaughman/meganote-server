var db = require('../config/db');

var UserSchema = db.Schema({
  name: String,
  username: String,
  updated_at: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now }
});

UserSchema.pre('save', function(next) {
  next();
});

UserSchema.pre('update', function(next) {
  this.updated_at = Date.now();
  next();
});

var User = db.model('User', UserSchema);

module.exports = User;
