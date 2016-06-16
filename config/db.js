var db = require('mongoose');
db.connect('mongodb://localhost/test');

module.exports = db;
