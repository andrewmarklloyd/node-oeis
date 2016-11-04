/**
 *	Reference https://oeis.org/eishelp1.html for internal format key
 */


 var request = require('request');
 var fs = require('fs');
 

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

/**
 *	OEIS constructor
 */
 function OEIS() {

 }

 OEIS.prototype = {

/** 
 *	Given the id of an OEIS sequence and a callback function,
 *	returns the basic sequence information.
 */
 getSequence: function(num, callback) {
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
 },

/**
*	Retreives the B-File (https://oeis.org/A<id>/b<id>.txt) which
* contains all of the sequences in the OEIS database
*/
getFullSequence: function(num, callback) {
	var id = pad(num, 6);
	var url = 'http://oeis.org/A' + id + '/b' + id + '.txt';

	request(url, function (error, response, body) {
		if (error) {
			callback({error: error}, null);
		} else {
			console.log(body);
		}
	});
}
}

