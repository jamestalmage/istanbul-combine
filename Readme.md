istanbul-combine
================
Combine coverage reports from multiple runs in to a single coverage report.

[![Build Status](https://travis-ci.org/jamestalmage/istanbul-combine.svg?branch=master)](https://travis-ci.org/jamestalmage/istanbul-combine)

[![peerDependency Status](https://david-dm.org/jamestalmage/istanbul-combine/peer-status.svg)](https://david-dm.org/jamestalmage/istanbul-combine#info=peerDependencies)
[![Dependency Status](https://david-dm.org/jamestalmage/istanbul-combine.svg)](https://david-dm.org/jamestalmage/istanbul-combine)
[![devDependency Status](https://david-dm.org/jamestalmage/istanbul-combine/dev-status.svg)](https://david-dm.org/jamestalmage/istanbul-combine#info=devDependencies)

```javascript
var combine = require('istanbul-combine');

var opts = {
  dir: 'coverage',                       // output directory for combined report(s)
  pattern: 'coverage/*-coverage.json',   // json reports to be combined 
  print: 'summary',                      // print to the console (summary, detail, both, none) 
  reporters: {
    html: { /* html reporter options */ },
    cobertura: { /* etc. */ }
  }
};

combine(opts, function(err) { });         // async with node style completion callback
combine(opts).then(/* ... */ );           // async with promise return value
combine.sync(opts);                       // synchronous
```

### command line

```
npm install -g istanbul-combine

istanbul-combine -d coverage -p summary -r lcov -r html coverage/coverage-a.json coverage/coverage-b.json /coverage/*.json
```

usage: `istanbul-combine [options] patterns`

where `patterns` is any number of file glob-patterns separated by whitespace

options:

 * `-d` : output directory for the report(s). Defaults to `coverage`
 * `-p` : what to print to the console. `summary` | `detail` | `both` | `none`. Defaults to `summary`.
 * `-r` : a reporter. `lcov`, `html`, etc. You can specify multiple reporters by using this tag multiple times.



