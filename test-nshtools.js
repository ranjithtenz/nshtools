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

var nsh = require('nshtools')
    assert = require('assert'),
    child_process = require('child_process'),
    tests = [];

tests.push("node test-ds.js");
tests.push("node test-finder.js");
tests.push("node test-mimetype.js");
tests.push("node test-run.js");
tests.push("node test-test.js");

process.stdout.write("Running Automated Tests\n");
for (test in tests) {
 (function (testname) {
    var parts = testname.split(" ", 2);
    cp = child_process.spawn(parts[0], [parts[1]]);
    cp.stdout.on('data', function(data) {
      process.stdout.write(data + "\n");
    });
    cp.stderr.on('data', function(data) {
      process.stdout.write('TEST ERROR: ' + data + "\n");
    });

    cp.on('exit', function (exit_code) {
      process.stdout.write("Finished: " + testname + ": " + new Date() + ' exit code: ' + exit_code + "\n");
    });
 })(tests[test]);
}
process.stdout.write("You should manually interactive tests: test-basic.js, test-prompt.js, test-die.js, test-options.js\n");


