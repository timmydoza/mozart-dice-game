var expect = require('chai').expect;
var mozart = require(__dirname + '/../index');
var fs = require('fs');

describe('mozart-dice-game', function() {
  describe('the getMinuet function', function() {
    it('should return a minuet object', function() {
      var minuetObj = mozart.getMinuet();
      expect(minuetObj).to.have.property('bytes');
      expect(minuetObj).to.have.property('measures');
      expect(minuetObj).to.have.property('dice');
      expect(minuetObj.dice.length).to.eql(16);
      expect(minuetObj.measures.length).to.eql(24);
    });
    it('should return a valid MIDI file', function() {
      var minuetObj = mozart.getMinuet();
      expect(minuetObj.bytes.slice(0, 4)).to.eql('MThd');
    });
  });
  describe('the saveMinuet function', function() {
    it('should syncronously save a valid MIDI file to disk if no callback is provided', function() {
      mozart.saveMinuet(__dirname + '/sync.mid');
      var midiFile = fs.readFileSync(__dirname + '/sync.mid').toString();
      expect(midiFile.slice(0,4)).to.eql('MThd');
    });
    it('should asyncronously save a valid MIDI file to disk if no callback is provided', function(done) {
      mozart.saveMinuet(__dirname + '/async.mid', function(err) {
        expect(err).to.eql(null);
        var midiFile = fs.readFileSync(__dirname + '/async.mid').toString();
        expect(midiFile.slice(0,4)).to.eql('MThd');
        done();
      });
    });
  });
});
