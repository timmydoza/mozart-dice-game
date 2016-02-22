var expect = require('chai').expect;
var mozart = require(__dirname + '/../index');

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
});
