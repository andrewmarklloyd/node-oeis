/**
 *	Reference https://oeis.org/eishelp1.html for internal format key
 */


 var request = require('request');
 var fs = require('fs');
 var async = require('async');
 var Entities = require('html-entities').AllHtmlEntities;
 entities = new Entities();


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

 function getSequenceInfo(num, callback) {
 	var id = 'A' + pad(num, 6);
 	var url = 'http://oeis.org/' + id + '/internal';
 	
 	request(url, function (error, response, body) {
 		if (error) {
 			callback({error: error}, null);
 		} else {
 			var name = parseName(body);
 			//var seq = parseSequence(body);
 			callback(null, {id: id, name: entities.decode(name)});
 		}
 	});
 }

 function getFullSequence(num, callback) {
 	var id = pad(num, 6);
 	var url = 'http://oeis.org/A' + id + '/b' + id + '.txt';

 	request(url, function (error, response, body) {
 		if (error) {
 			callback({error: error}, null);
 		} else {
 			var list = body.split('\n');
 			var seq = [];
			//console.log(list[0]);
			list.forEach(function(item) {
				if (item.indexOf('#') == -1 && item !== '') {
					var line = item.split(' ');
					var idx = Number(line[0]);
					var element = Number(line[1]);
					if (typeof idx !== 'number' || typeof element !== 'number') {
						throw new Error('NOT A NUMBER', idx, element);
					}
					seq.push({idx: Number(line[0]), element: Number(line[1])});
				}
			});
			callback(null, seq);
		}
	});
 }

 function validate(num) {
 	if (typeof num !== 'number') {
 		throw new TypeError(num + ' must be a valid number');
 	}
 }

 module.exports = OEIS;

/**
 *	OEIS constructor
 */
 function OEIS() {

 }
 /* Define the public functions */
 OEIS.prototype = {

 	getSequenceInfo: function(num, callback) {
 		validate(num);
 		getSequenceInfo(num, callback);
 	},

	/**
	*	Retreives the B-File (https://oeis.org/A<id>/b<id>.txt) which
	* contains all of the sequences in the OEIS database
	*/
	getFullSequence: function(num, callback) {
		validate(num);
		getFullSequence(num, callback);
	},

	/*
	* Performs synchronous scraping of sequence data to avoid overloading OEIS.org
	*/
	getMultipleSequences: function(start, end, callback) {
		validate(start);
		validate(end);
		var list = [];
		var i = start;
		async.whilst(
			function() {
				return i <= end;
			},
			function(next) {
				getSequenceInfo(i, function(err, info) {
					
					if (err) {
						next(err, null);
						return;
					}
					getFullSequence(i, function(err, seq) {
						if (err) {
							next(err, null);
						} else {
							list.push({id: info.id, name: info.name, seq: seq});
							next(null, list);
						}
					});
				});
				i++;
			},
			function(err, data) {
				if (err) {
					callback(err, null);
				} else {
					callback(null, data);
				}
			});
	}
}

