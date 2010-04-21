#!/usr/bin/env node

/**
 * test-nshtools.js - a wrapper for all the separate tests.
 */
if (require.paths.indexOf(process.cwd()) < 0) {
  require.paths.push(process.cwd());
}
if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}

var nsh = require('nshtools'), 
    sys = require('sys'),
    tests = [];

tests.push("node test-ds.js");
tests.push("node test-option.js");
tests.push("node test-finder.js");
tests.push("node test-mimetype.js");
tests.push("node test-run.js");
tests.push("node test-test.js");
tests.push("echo 'You should manually interactive tests: test-nshtools-basic.js, test-nshtools-prompt.js, test-nshtools-die.js'");

sys.puts("Running Automated Tests");
for (test in tests) {
 (function (testname) {
    sys.exec(testname, function (err, stderr, stdout) {
      if (err) {
        sys.error('TEST ERROR: ' + err);
      }
      if (stderr.trim() !== "") {
        sys.puts(stderr);
      }
      if (stdout.trim() !== "") {
        sys.puts(stdout);
      }
      sys.puts("Finished: " + testname + ": " + new Date());
    });
 })(tests[test]);
}

