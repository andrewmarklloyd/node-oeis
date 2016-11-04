
var request = require('request');
var fs = require('fs');

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function parseName(body) {
	var start_index = body.indexOf('%N') + 3;
	var end_index = body.indexOf('</tt>', start_index);
	var name = body.substring(start_index, end_index -1);
	return name;
}


module.exports = OEIS;

function OEIS() {

}


OEIS.prototype.getSequence = function(id) {
	var url = 'http://oeis.org/A' + pad(id, 6) + '/internal';
	
	request(url, function (error, response, body) {
		if (error) {
			throw error;
		} else {
			console.log(parseName(body));
		}
	});
}



var oeis = new OEIS();

for (var i = 12; i < 30; i++) {
	oeis.getSequence(i);
}







