var db = require('../config/db');

var UserSchema = db.Schema({
  name: String,
  username: String,
  updated_at: { type: Date, default: Date.now }
});

var User = db.model('User', UserSchema);

module.exports = User;
