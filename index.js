var fs = require('fs');
var glob = require('glob');
var Q = require('q');
var readFile = Q.denodeify(fs.readFile);
var Report = require('istanbul').Report;
var Collector = require('istanbul').Collector;


function makeReporters(options) {
  var result = [];
  var reporters = options.reporters &&
  typeof options.reporters === 'object' ? options.reporters : {};
  Object.keys(reporters).forEach(function(reporter) {
    var reporterOpts = reporters[reporter];
    if(reporterOpts) {
      if(options.dir && !reporterOpts.dir) {
        reporterOpts.dir = options.dir;
      }
      result.push({ type : reporter, options : reporterOpts });
    }
  });

  var append = function(t) {
    if(t && !reporters[t]) {
      result.push({ type : t, options : options});
      reporters[t] = true;
    }
  };

  append(options.type);

  var mapping = {
    'none' : [],
    'detail': ['text'],
    'both' : ['text', 'text-summary']
  };
  var a = mapping[options.print];
  if(a) {
    a.forEach(append);
  } else {
    append('text-summary');
  }
  return result;
}

function makeCoverageTaskFn(opts){
  opts = opts || {};
  if (!opts.dir) opts.dir = 'coverage';
  var pattern = opts.pattern || 'coverage/*-coverage.json';

  return function (done){

    var fileContentPromises = [];
    var collector = new Collector();
    var readDefer = Q.defer();

    glob(pattern)
      .on('match', function(filePath) {
        fileContentPromises.push(readFile(filePath,'utf-8').then(function(fileContents){
          collector.add(JSON.parse(fileContents));
          return true;
        }));
      })
      .on('error', readDefer.reject)
      .on('end', function() {
        Q.all(fileContentPromises).then(readDefer.resolve);
      });

    return readDefer.promise.then(
      function(files) {
        var writePromises = [];
        makeReporters(opts).forEach(function(reporterDef) {
          var defer = Q.defer();
          Report.create(reporterDef.type, reporterDef.options)
            .on('done', defer.makeNodeResolver())
            .on('error', defer.makeNodeResolver())
            .writeReport(collector, false);
          writePromises.push(defer.promise);
        });

        return Q.all(writePromises);
      }
    ).then(
      function(result){
        if(done) done();
        return true;
      },
      function(reason) {
        if(done) done(reason);
        return Q.reject(reason);
      }
    );
  }
}

module.exports = makeCoverageTaskFn;