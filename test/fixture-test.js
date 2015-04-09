describe('fixture', function() {
  var assert = require('assert');
  it('branch', function() {
    var value = require('../fixture/branch')();
    if (value === 'a') {
      assert.equal('a', process.env.FIXTURE_BRANCH);
    } else {
      assert.notEqual('a', process.env.FIXTURE_BRANCH);
    }
  });
});