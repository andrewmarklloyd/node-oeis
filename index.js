

var OEIS = require('./OEIS');
var oeis = new OEIS();

 //for (var i = 12000; i < 13000; i++)
 oeis.getSequence(12995, function(err, data) {
 	console.log(data);
 });
