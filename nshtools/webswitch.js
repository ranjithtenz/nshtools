/**
 * webswitch.js - a simple http request dispatch system.
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


var sys = require('sys'),
    fs = require('fs'),
    path = require('path'),
    self = {};


/**
 * addHandler
 * 
 * Add a handler which will use the callback based on the 
 * uri matching the regular_expression and the methods you're filtering
 * (e.g. GET, POST).  Callback will be passed url, method, as well as
 * the request and response objects received by dispatcher method.  
 * Method will contain an object with the pre-processed
 * values for GET, POST, PUT, DELETE and FILE based on what was requested
 * by the handler.
 */
addHandler = function (regular_expression, methods, callback) {
};


/**
 * addErrorHandler
 * 
 * Add an error handler. Callback will be passed url, method, as well as
 * the request and response objects received by dispatcher method.  
 * Method will contain an object with the pre-processed
 * values for GET, POST, PUT, DELETE and FILE based on what was requested
 * by the handler.
 */
addErrorHandler = function (callback) {
};


/**
 * dispatcher
 *
 * dispatcher takes a request and response object and invokes the matching
 * callback defined by addHandler method.
 */
dispatcher = function (request, response) {
};

 
exports.addHandler = addHandler;
exports.dispatcher = dispatcher;
