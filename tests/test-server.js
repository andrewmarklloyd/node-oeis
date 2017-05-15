var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var expect = chai.expect();
var fs = require('fs');


var OEIS = require('../OEIS');
var oeis = new OEIS();


describe('OEIS', function() {
	
	describe('#getSequenceInfo', function() {

		var err;
		var data;
		var catchError;

		// TODO: refactor to not use callback inside callback
		before(function(done) {
			oeis.getSequenceInfo(123456, function(err, info) {
				err = err;
				data = info;
				try {
				oeis.getSequenceInfo("a", function(err, info) {});	
			} catch(e) {
				catchError = e;
				done();
			}	
			});
		});

		it('error should be null', function() {
			assert.equal(err, null);
		});

		it('should return valid OEIS id', function() {
			assert.equal(data.id, 'A123456');
		});

		it('should return valid OEIS name', function() {
			assert.equal(data.name, 'Lud van Beethoven, Bagatelle No. 25, \"Für Elise\".');
		});

		it('error should be TypeError', function() {
			assert.equal(catchError.name, 'TypeError');
		});

		it('error message should be correct', function() {
			assert.equal(catchError.message, 'a must be a valid number');
		});

	});

	describe('#getFullSequence', function() {

		var err;
		var data;
		var catchError;

		// TODO: refactor to not use callback inside callback
		before(function(done) {
			oeis.getFullSequence(54321, function(err, seq) {
				err = err;
				data = seq;
				//console.log(JSON.stringify(seq));
				try {
					oeis.getFullSequence('b', function(err, seq) {});
				} catch(e) {
					catchError = e;
					done();
				}
			});
		});

		it('error should be null', function() {
			assert.equal(err, null);
		});

		it('returned sequence should be correct', function() {
			var full_sequence = fs.readFileSync('tests/data/54321_full_sequence.json');
			assert.deepEqual(data, JSON.parse(full_sequence));
		});		

		it('error should be TypeError', function() {
			assert.equal(catchError.name, 'TypeError');
		});

		it('error message should be correct', function() {
			assert.equal(catchError.message, 'b must be a valid number');
		});

	});
});
