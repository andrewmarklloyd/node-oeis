//100000 sequences time without writing to db: 794m51.234s (13 hours)
////100000 sequences running two threads, time without writing to db: 409m14.099s (6.8 hours)

var OEIS = require('../OEIS');
var oeis = new OEIS();

function exampleGetSequenceInfo() {
	oeis.getSequenceInfo(1, function(err, data){
		console.log(data);
	});
}

function exampleGetFullSequence() {
	oeis.getFullSequence(1, function(err, data){
		console.log(data);
	});
}

function exampleGetMultipleSequences() {
	var size = 1;
	var start = 100;
	var end = start + size;
	oeis.getMultipleSequences(start, end, function(err, data) {
		if (err) {
			console.log('Error:', err);
		} else {
			console.log('Sequences:', data);
		}
	});
}


