'use strict';

var fs = require('fs');
var parse = require(__dirname + '/lib/parse_notes');
var noteTable = require(__dirname + '/lib/notes');
var diceTables = require(__dirname + '/lib/tables');

module.exports = {
  saveMinuet: function(fileName, callback) {
    fs.writeFile(fileName, this.getMinuet().bytes, 'binary', callback);
  },

  getMinuet: function(tempo) {
    var minuet = {
      dice: [],
      measures: [],
    };
    var notes = [];
    var diceroll, measure, measureNotes;
    //roll the dice
    for (; minuet.dice.length <= 16; minuet.dice.push(Math.floor(Math.random() * 11)));

    //get notes for first part
    for (var i = 0; i < 16; i++) {
      diceroll = minuet.dice[i % 8];
      measure = diceTables.first[diceroll][i % 8];
      measureNotes = noteTable[measure];
      if (i === 15) {
        //use second ending for final measure
        notes.push(noteTable[177]);
        minuet.measures.push(177);
      } else {
        notes.push(measureNotes);
        minuet.measures.push(measure);
      }
    }
    //get notes for second part
    for (i = 0; i < 8; i++) {
      diceroll = minuet.dice[i % 8];
      measure = diceTables.second[diceroll][i];
      measureNotes = noteTable[measure];
      notes.push(measureNotes);
      minuet.measures.push(measure);
    }
    //turn notes into MIDI binary
    minuet.bytes = parse(notes, tempo || 80);
    return minuet;
  }
};
