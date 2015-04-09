module.exports = function() {
  if (process.env.FIXTURE_BRANCH === 'a') {
    return 'a';
  }
  else {
    return 'b';
  }
};