istanbul-combine
================
Combine coverage reports from multiple runs in to a single coverage report.

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
