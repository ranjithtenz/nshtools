/**
 * console.js - provide basic support to prompt user and output content to the console.
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

var self = { worker_queue : [] };

/**
 * addPrompt - add a display message and callback to be dispatched interactively
 * when prompt is executed.
 *
 * @param label - the text to display on the console.
 * @param callback - the callback to use when response received.  Callback is passed
 * error and value.
 */
addPrompt = function (label, callback) {
  self.worker_queue.push({'label' : label, 'callback' : callback});
};

/**
 * prompt - display text to the console and wait for a response.
 * If a callback is supplied then treat prompt as non-blocking and send response
 * to callback method.
 *
 * @param label - the text to display on the console.
 * @param callback - the callback to use when response received.  Callback is passed
 * error and value.
 */
prompt = function (label, callback) {
  var stdin = process.openStdin(), err;
  stdin.setEncoding('utf8');

  if (arguments.length > 0) {
    addPrompt(label, callback);
  }
  if (self.worker_queue.length > 0 && self.worker_queue[0].label !== undefined) {
    process.stdout.write(self.worker_queue[0].label);
  }

  inputHandler = function(data) {
    var worker = self.worker_queue.shift();
    worker.callback(err, data.toString());
    if (self.worker_queue.length === 0) {
      process.exit(0);
    }
    
    if (self.worker_queue.length > 0 && self.worker_queue[0].label !== undefined) {
      process.stdout.write(self.worker_queue[0].label);
    }
  };

  errorHandler = function (exception) {
    err = exception;
  };

  stdin.on('data', inputHandler);
  stdin.on('error', errorHandler);
};

exports.addPrompt = addPrompt;
exports.prompt = prompt;

