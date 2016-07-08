var router = require('express').Router();
var Note = require('../models/note');

// READ all notes
router.get('/', function(req, res) {
  Note
    .find()
    .then(function(notes) {
      res.json(notes);
    });
});

// CREATE new note
router.post('/', function(req, res) {
  var note = new Note(req.body.note);
  note.save(function (err, note) {
    if (err) return res.json({error: err});
    res.json({note: note});
  });
});

// UPDATE existing note
router.put('/:id', function(req, res) {
  var note = req.body.note;
  Note
    .findByIdAndUpdate(note._id, note, {new: true}, function(err, note) {
      if (err) {
        res.json({error: err});
      } else {
        res.json({note: note});
      }
    });
});

// DELETE a note
router.delete('/:id', function(req, res) {
  Note.findByIdAndRemove(req.params.id, function(err, note) {
    if (err) {
      res.json({error: err});
    } else {
      res.json({note: note});
    }
  });
});

module.exports = router;
