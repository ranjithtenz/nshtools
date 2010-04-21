/**
 * tpr - Tasks, Prompts, Run; A system for handling tasks and prompts to help make shell scripting/batch
 * processing easier using NodeJS.
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

if (require.paths.indexOf(process.cwd()) < 0) {
  require.paths.push(process.cwd());
}
if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}

var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    ds = require('./ds'),
    self = { 'work_queue' : ds.Queue() };


/**
 * NoOp - a function that doesn't do anything.
 */
NoOp = function () {};


/**
 * prompt - adds a prompt and callback to the work queue.
 * @param message - the message to display as prompt
 * @param callback - the callback to be run
 */
prompt = function (message, callback) {
  self.work_queue.push({'message' : message, 'callback' : callback, 'qtype' : 'prompt'});
};

/**
 * task - add a non-prompting task to the work queue.
 * @param label - the label shown when task fired.
 * @param callback - the callback function fired.
 */
task = function (label, callback) {
  if (callback === undefined && label === undefiend) {
    label = 'NoOp';
    callback = NoOp;
  }
  if (label === undefined) {
    label = '';
  }
  if (callback === undefined) {
    label += "\n\tWARNING: no callback defined for label, using NoOp.";
    callback = NoOp;
  }
  self.work_queue.push({'label' : label, 'callback' : callback, 'qtype' : 'task'});
};

/**
 * die - print something to the console using sys.error() and exit the process
 */
die = function (display_message, exit_val) {
  if (exit_val === undefined) {
    exit_val = 1;
  }
  sys.error(display_message);
  process.exit(exit_val);
};

 
/**
 * Run all the queued prompts and callbacks.
 */
run = function () {
  var msg = '', self = this,
      need_to_close_stdio = true;
      
  runTasks = function() {
    var more_tasks, action;
    /* Run through tasks first */
    more_tasks = false;
    if (self.work_queue.length > 0) {
      more_tasks = true;
    }
    while(more_tasks) {
      if (self.work_queue[0].qtype === 'task') {
        action = self.work_queue.shift();
        sys.print(action.label);
        action.callback();
        if (self.work_queue.length === 0) {
          more_tasks = false;
        }
      } else {
        more_tasks = false;
      }
    }
  }
  runTasks();

  /* If we have tasks left then go into interactive mode */
  if (self.work_queue.length > 0) {
    /* Display the first message in queue. */
    if (self.work_queue[0].qtype === 'prompt') {
      sys.print(self.work_queue[0].message);
    }

    (function (){
      var stdin = process.openStdin();
      
      inputHandler = function(data) {
        var action = self.work_queue[0];
        if (self.work_queue[0] === undefined) {
          stdin.end();
        } else {
          action.callback(data.toString());
          self.work_queue.shift();
          /* Run any non prompting tasks */
          runTasks();
          /* Prompt for next action. */
          if (self.work_queue.length > 0) {
            if (self.work_queue[0].qtype === 'prompt') {
              sys.print(self.work_queue[0].message);
            }
          } else {
            stdin.end();
          }
        }      
      };
      
      cleanupHandlers = function () {
        stdin.removeListener('data', inputHandler);
        stdin.removeListener('end', cleanupHandlers);      
      };
      
      stdin.addListener('data', inputHandler);
      stdin.addListener('end', cleanupHandlers);      
    }());
  }
};

exports.die = die;
exports.NoOp = NoOp;
exports.prompt = prompt;
exports.task = task;
exports.run = run;
