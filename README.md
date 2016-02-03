# mozart-dice-game

In 1787, composer Wolfgang Amadeus Mozart published a musical composition entitled "Musikalisches Würfelspiel", or "Musical Dice Game".  This composition allows one, as Mozart puts it, "to compose, without the least knowledge of music, so many German waltzes or ländler as one pleases, by throwing a certain number with two dice."

This package generates a random minuet as determined by the music and rules of Mozart's dice game and saves it as a MIDI file.

## Installation

`npm install mozart-dice-game`

## Usage

```
var mozart = require('mozart-dice-game');

mozart.saveMinuet('minuet.mid');
```

The above usage is a synchronous function.  To asynchronously save the MIDI file to disk, simply provide a callback function.

```
mozart.saveMinuet('minuet.mid', function(err) {
  if (err) throw err;
  console.log('saved!');
});
```
