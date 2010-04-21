/**
 * nshtests.js - Test object for nshtools.
 *
 * @author R. S. Doiel, <rsdoiel@gmail.com>
 * copyright (c) 2010 R. S. Doiel, all rights reserved
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the R. S. Doiel nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
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

