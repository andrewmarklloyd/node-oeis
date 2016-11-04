var chai = require('chai');
var should = chai.should();
var assert = require('assert');
var expect = chai.expect();

var OEIS = require('../OEIS');
var oeis = new OEIS();


describe('OEIS', function() {
  describe('#getSequenceInfo', function() {
  	it('error should be null', function(done) {
  		oeis.getSequenceInfo(123456, function(err, info) {
  			assert.equal(err, null);
  			done();
  		});
  	});

	it('should return valid OEIS sequence info', function(done) {
  		oeis.getSequenceInfo(123456, function(err, info) {
  			assert.equal(info.id, 'A123456');
  			assert.equal(info.name, 'Ludwig van Beethoven, Bagatelle No. 25, \"Fuer Elise\".');
  			done();
  		});
  	});

  });
});
