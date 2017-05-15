//100000 sequences time without writing to db: 794m51.234s (13 hours)
////100000 sequences running two threads, time without writing to db: 409m14.099s (6.8 hours)

var OEIS = require('../OEIS');
var oeis = new OEIS();


var size = 5;
var start = 15000;
var end = start + size;

console.log('running simultaneous 0 - 50000 and 50000 - 100000');

oeis.getMultipleSequences(start, end, function(err, data) {
	console.log(err);
});
