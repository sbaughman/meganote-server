var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.json([
    {
      title: 'Hardcoded note',
      body_html: 'My cool note'
    },
    {
      title: 'Also hardcoded',
      body_html: 'Node is fun.'
    }
  ]);
});

app.listen(3030, function() {
  console.log('listening on http://localhost:3030...');
})
