/**
 * tests.js - Simple Unit test framework for nshtools.js with minimal
 * dependancies.
 *
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2010, R. S. Doiel, all rights reserved
 *
 * Released under "The BSD License" as described at 
 * http://opensource.org/licenses/bsd-license.php
 */

UnitTests = { 
  queue : [],
  msgs : [],
  successes : 0,
  failures : 0,

  echo : function (msg) {
    var s;
    if (msg) {
      this.msgs.push(msg);
      return true;
    } else {
      s = this.msgs.join("\n");
      delete this.msgs;
      this.msgs = [];
      return s;
    }
    return false;
  },
  
  success : function () {
    this.successes += 1;
  },
  
  fail : function (msg) {
    this.echo(msg);
    this.failures += 1;
  },
  
  assertTrue : function (expression, msg) {
    if (expression === true) {
      this.success();
      return true;
    }
    this.fail("assertTrue Failed: " + msg);
    return false;
  },
  
  assertFalse : function (expression, msg) {
    if (expression === false) {
      this.success();
      return true;
    }
    this.fail("assertFalse Failed: " + msg);
    return false;
  },
  
  assertFail : function (msg) {
    this.fail(msg);
    return false;
  },
  
  addTest : function(label, callback) {
    this.queue.push({'label' : label, 'callback' : callback});
  },
  
  run : function () {
    while (this.queue.length > 0) {
      test = this.queue.shift();
      this.echo(test.label);
      test.callback(test.label);
    }
    return this.echo() + "\n" + 
            this.successes + " passed\n" + 
            this.failures + " failed\n";        
  }
};


if (exports !== undefined) {
	exports.UnitTests = UnitTests;
	exports.UnitTests.echo = UnitTests.echo;
	exports.UnitTests.success = UnitTests.success;
	exports.UnitTests.fail = UnitTests.fail;
	exports.UnitTests.assertTrue = UnitTests.assertTrue;
	exports.UnitTests.assertFalse = UnitTests.assertFalse;
	exports.UnitTests.addTest = UnitTests.addTest;
	exports.UnitTests.run = UnitTests.run;
}


