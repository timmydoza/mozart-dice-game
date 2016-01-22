var fs = require('fs');
var parse = require(__dirname + '/lib/parse_notes');
var notes = require(__dirname + '/lib/notes');

var minuet = [notes['40'], notes['87'], notes['113'], notes['61'], notes['161'], notes['47'], notes['159'], notes['100'],
             notes['3'], notes['17'], notes['165'], notes['85'], notes['135'], notes['2'], notes['147'], notes['100'],
             notes['70'], notes['121'], notes['26'], notes['9'], notes['112'], notes['49'], notes['109'], notes['14']];

var bytes = parse([notes['40'], notes['87'], notes['113'], notes['61'], notes['161'], notes['47'], notes['159'], notes['100'],
                   notes['3'], notes['17'], notes['165'], notes['85'], notes['135'], notes['2'], notes['147'], notes['100'],
                   notes['70'], notes['121'], notes['26'], notes['9'], notes['112'], notes['49'], notes['109'], notes['14']], 80);

fs.writeFileSync('test.mid', bytes, 'binary');
debugger;
