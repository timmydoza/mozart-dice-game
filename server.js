var notes = require(__dirname + '/lib/vex_notes');
var express = require('express');
var app = express();

var dice = [40, 87, 113, 61, 161, 47, 159, 100,
            3, 17, 165, 85, 135, 2, 147, 100,
            70, 121, 26, 9, 112, 49, 109, 14];

var minuet = {
  treble: [],
  bass: []
};

dice.forEach(function(bar) {
  minuet.treble.push(notes[bar].treble);
  minuet.bass.push(notes[bar].bass);
});

app.use('/', express.static('static'));
app.get('/music', function(req, res) {
  res.json(minuet);
});

app.listen(3000, function() {
  console.log('server up');
});
