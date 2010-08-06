#!/usr/bin/env node
/**
 * test-unittest.js - test the UnitTests object.
 *
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2010, R. S. Doiel, all rights reserved
 *
 * Released under "The BSD License" as described at 
 * http://opensource.org/licenses/bsd-license.php
 */

if (require.paths.indexOf(process.cwd()) < 0) {
  require.paths.push(process.cwd());
}
if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}

var assert = require('assert'),
		sys = require('sys');
    test = require('nshtools/unittests').UnitTests;

sys.puts("Checking to see all methods are exposed.");
assert.ok(test.echo !== undefined, "Should have an echo()");
assert.ok(test.success !== undefined, "Should have an success()");
assert.ok(test.success !== undefined, "Should have an fail()");
assert.ok(test.assertTrue !== undefined, "Should have an assertTrue()");
assert.ok(test.assertFalse !== undefined, "Should have an assertFalse()");
assert.ok(test.assertFail !== undefined, "Should have an assertFail()");
assert.ok(test.addTest !== undefined, "Should have an addTest()");
assert.ok(test.run !== undefined, "Should have an run()");

sys.puts("Run some test cases using methods");

sys.puts("Testing test.echo(): " + (function() {
  var test_messages = [], result = '';
  test_messages.push('This is a test of test.echo: ');
  test_messages.push("Message two.");
  test_messages.push("Message three.");

  test.echo(test_messages[0]);
  test.echo(test_messages[1]);
  test.echo(test_messages[2]);
  result = test.echo();
  
  if (result === test_messages.join("\n")) {
    test.success();
    return "Ok, test.echo() worked";
  }
  test.fail("Oops, test.echo() returned: " + result);
  return "Oops, test.echo() returned: " + result;
})());

sys.puts("Testing test.success(): " + (function () {
  var i = test.successes;
  test.success();
  
  if (test.successes === (i + 1)) {
    return "Ok, test.success() worked.";
  }
  test.fail("Oops, test.success() failed.");
  return "Oops, test.sucess() failed: expected [" + (i + 1) + "] found [" + test.successes + "]";
})());

