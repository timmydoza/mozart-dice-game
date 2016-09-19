var Midi = require('jsmidgen');

module.exports = function(notes, tempo) {
  var file = new Midi.File();
  var treble = new Midi.Track();
  var bass = new Midi.Track();
  file.addTrack(treble);
  file.addTrack(bass);
  treble.setTempo(tempo || 70);
  bass.setTempo(tempo || 70);
  treble.setInstrument(1, 0);
  bass.setInstrument(1, 0);

  treble.note(2, 0, 1);
  bass.note(2, 0, 1);

  for (var i = 0; i < notes.length; i++) {
    parse(notes[i].treble, treble, 0);
    parse(notes[i].bass, bass, 1);
  }
  return file.toBytes();
};

parse = function(notes, track, channel) {
  for (var i = 0; i < notes.length; i++) {
    if (Array.isArray(notes[i][0])) {
      var chord = notes[i][0];
      var duration = 512 * (1 / notes[i][1]);
      for (var j = 0; j < chord.length; j++) {
        var pitch = notes[i][0][j];
        track.note(channel, pitch);
      }
      track.noteOff(channel, notes[i][0][0], duration);
      for (var j = 1; j < chord.length; j++) {
        var pitch = notes[i][0][j];
        track.noteOff(channel, pitch);
      }
    }
    if (typeof notes[i][0] === 'string') {
      var pitch = notes[i][0];
      var duration = 512 * (1 / notes[i][1]);
      track.note(channel, pitch, duration);
    }
    if (typeof notes[i][0] === 'number') {
      var duration = 512 * (1 / notes[i][0]);
      track.noteOff(channel, 0, duration);
    }
  }
};
