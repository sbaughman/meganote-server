var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('I <3 Express');
});

app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
})
