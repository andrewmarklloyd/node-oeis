var chai = require('chai');
var should = chai.should();
var assert = chai.assert;
var expect = chai.expect();
var fs = require('fs');


var OEIS = require('../OEIS');
var oeis = new OEIS();


describe('OEIS', function() {
	
	describe('#getSequenceInfo', function() {

		var data;
		var catchError;

		before(function(done) {
			oeis.getSequenceInfo(123456, function(err, info) {
				data = info;
				try {
				oeis.getSequenceInfo("a", function(err, info) {
					
				});	
			} catch(e) {
				catchError = e;
				done();
			}	
			});

			
		});

		it('error should be null', function() {
			assert.equal(data.err, null);
		});

		it('should return valid OEIS id', function() {
			assert.equal(data.id, 'A123456');
		});

		it('should return valid OEIS name', function() {
			assert.equal(data.name, 'Ludwig van Beethoven, Bagatelle No. 25, \"Fuer Elise\".');
		});

		it('error should be TypeError', function() {
			assert.equal(catchError.name, 'TypeError');
		});

		it('error message should be correct', function() {
			assert.equal(catchError.message, 'a must be a valid number');
		});

	});
});
