var Midi = require('jsmidgen');

function parse(notes, track, channel) {
  for (var i = 0; i < notes.length; i++) {

    if (Array.isArray(notes[i][0])) {
      var chord = notes[i][0];
      var duration = 512 * (1 / notes[i][1]);
      track.addChord(channel, chord, duration);
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
}

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

  //Adds a silent note at the beginning to deal with a MIDI.js playback bug
  treble.note(2, 0, 1);
  bass.note(2, 0, 1);

  for (var i = 0; i < notes.length; i++) {
    parse(notes[i].treble, treble, 0);
    parse(notes[i].bass, bass, 1);
  }

  return file.toBytes();
  
};
