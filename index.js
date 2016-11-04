/**
 *	Reference https://oeis.org/eishelp1.html for internal format key
 */


 var request = require('request');
 var fs = require('fs');
 

 var connection;

function sumList(seq) {
	var sum = seq.reduce(function(a, b) {
		return a + b;
	});
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function parseLine(startKey, body) {
	var start_index = body.indexOf(startKey) + 3;
	var end_index = body.indexOf('</tt>', start_index);
	var line = body.substring(start_index, end_index -1);
	return line;
}

function parseName(body) {
	return parseLine('%N', body);
}

function parseSequence(body) {
	var sequence = [];
	var sLine = parseLine('%S', body);

	if (body.indexOf('%T')) {
		sLine += parseLine('%T', body);
	}
	if (body.indexOf('%U')) {
		sLine += parseLine('%U', body);
	}
	return sLine.split(",").map(function (val) {
		return Number(val);
	});
}

module.exports = OEIS;

function OEIS() {

}

var count = 0;

/** 
 *	
 */
 OEIS.prototype.getSequence = function(num, callback) {
 	var id = 'A' + pad(num, 6);
 	var url = 'http://oeis.org/' + id + '/internal';
 	
 	request(url, function (error, response, body) {
 		if (error) {
 			callback({error: error}, null);
 		} else {
 			var name = parseName(body);
 			var seq = parseSequence(body);
 			callback(null, {id: id, name: name, seq: seq});
 		}
 	});
 }



 var oeis = new OEIS();

 //for (var i = 12000; i < 13000; i++)
 oeis.getSequence(12995, function(err, data) {
 	console.log(data.seq[data.seq.length - 1]);
 });








