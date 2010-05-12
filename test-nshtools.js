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
    assert = require('assert'),
    child_process = require('child_process'),
    tests = [];

tests.push("node test-ds.js");
tests.push("node test-option.js");
tests.push("node test-finder.js");
tests.push("node test-mimetype.js");
tests.push("node test-run.js");
tests.push("node test-test.js");

sys.puts("Running Automated Tests");
for (test in tests) {
 (function (testname) {
    var parts = testname.split(" ", 2);
    child_process.spawn(parts[0], [parts[1]]);
    child_process.addListener('data',
     function (err, stderr, stdout) {
      if (err) {
        sys.error('TEST ERROR: ' + err);
      }
      if (stderr.trim() !== "") {
        sys.puts(stderr);
      }
      if (stdout.trim() !== "") {
        sys.puts(stdout);
      }
    });
    child_process.addListener('exit', function (exit_code) {
      sys.puts("Finished: " + testname + ": " + new Date() + ' exit code: ' + exit_code);
    });
 })(tests[test]);
}
sys.puts("You should manually interactive tests: test-basic.js, test-prompt.js, test-die.js");


