var Midi = require('jsmidgen');

var file = new Midi.File();
var treble = new Midi.Track();
var bass = new Midi.Track();

file.addTrack(treble);
file.addTrack(bass);

module.exports = function(notes, tempo) {
  treble.setTempo(tempo || 80);
  bass.setTempo(tempo || 80);

  for (var i = 0; i < notes.length; i++) {
    parse(notes[i].treble, treble);
    parse(notes[i].bass, bass);
  }
  return file.toBytes();
};

parse = function(notes, track) {
  for (var i = 0; i < notes.length; i++) {
    if (Array.isArray(notes[i][0])) {
      var chord = notes[i][0];
      var duration = 512 * (1 / notes[i][1]);
      for (var j = 0; j < chord.length; j++) {
        var pitch = notes[i][0][j];
        track.note(0, pitch);
      }
      track.noteOff(0, notes[i][0][0], duration);
      for (var j = 1; j < chord.length; j++) {
        var pitch = notes[i][0][j];
        track.noteOff(0, pitch);
      }
    }
    if (typeof notes[i][0] === 'string') {
      var pitch = notes[i][0];
      var duration = 512 * (1 / notes[i][1]);
      track.note(0, pitch, duration);
    }
    if (typeof notes[i][0] === 'number') {
      var duration = 512 * (1 / notes[i][0]);
      track.noteOff(0, 'c2', duration);
    }
  }
};
