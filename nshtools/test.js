/**
 * nshtests.js - Test object for nshtools.
 *
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2010, R. S. Doiel, all rights reserved
 *
 * Released under "The BSD License" as described at 
 * http://opensource.org/licenses/bsd-license.php
 */

/* It's useful to beable to use things in the working directory */
if (require.paths.indexOf(process.cwd()) < 0) {
  require.paths.push(process.cwd());
}
if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}

var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    ds = require('./ds');

/**
 * Test - this is a set of methods for integrating assertive tests
 * into shell scripts.
 */
Test = function () { 
  var self = {};

  self.queue = ds.Queue();
  self.msgs = ds.Queue();
  self.successes = 0;
  self.failures = 0;


  self.echo = function (msg) {
    var s;
    if (msg) {
      self.msgs.push(msg);
      return true;
    } else {
      return self.msgs.shiftAll().join("\n");
    }
    return false;
  };


  self.success = function () {
    self.successes += 1;
  };
  

  self.fail = function (text) {
    self.echo(text);
    self.failures += 1;
  };
  

  self.assertTrue = function (expression, text) {
    if (expression === true) {
      self.success();
      return true;
    }
    self.fail("assertTrue Failed: " + text);
    return false;
  };


  self.assertFalse = function (expression, text) {
    if (expression === false) {
      self.success();
      return true;
    }
    self.fail("assertFalse Failed: " + text);
    return false;
  };


  self.assertFail = function (text) {
    self.fail(text);
    return false;
  };


  self.addTest = function(label, callback) {
    self.queue.push({'label' : label, 'callback' : callback});
  };

  
  self.run = function () {
    while (self.queue.length > 0) {
      test = self.queue.shift();
      self.echo(test.label);
      test.callback(test.label);
    }
    return self.echo() + "\n" + 
           self.successes + " passed\n" + 
           self.failures + " failed\n";        
  };

  return self;
};

exports.Test = Test;

