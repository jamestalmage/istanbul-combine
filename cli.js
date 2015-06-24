#!/usr/bin/env node

var argv = require('minimist')(process.argv.slice(2));

var r = argv.r || 'lcov';

if(typeof r === 'string') {
  r = [r];
}

var reporters = {};

r.forEach(function(reporterList){
  reporterList.split(',').forEach(function(reporter){
    reporters[reporter] = {};
  });
});

var pattern = argv._;
if (pattern.length === 0) {
  pattern = null;
}

require('./')({
  dir: argv.d,
  pattern: pattern,
  print: argv.p,
  reporters:reporters
});