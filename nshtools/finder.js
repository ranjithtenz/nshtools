/**
 * finder.js - simple directory tree scanner.
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

var sys = require('sys'),
    fs = require('fs'),
    path = require('path');

/**
 * finder - proof of concept for crawling folder trees.
 *
 * This should probably be integrated into a common object with globFolder
 *
 * @param folder - the path you want to scan
 * @param options - an object which defines regex, filter properties.
 * e.g. {'regex' : new RegEx('*.txt'), 'scantype' : 'file' , 'depth' : 1 }
 * @param callback - the callback function you want to run. Two parameters are
 * passed err and the path found.
 */
finder = function (folder, options, callback) {
  if (options.regex === undefined) {
    options.regex = false;
  }
  if (options.scantype === undefined) {
    options.scantype = 'all';
  }

  // If we're finding folders we find them here.  
  if (options.scantype === 'directory' || options.scantype === 'all') {
    if (options.regex === false) {
      callback(undefined, folder);  
    } else if (folder.match(options.regex)) {
      callback(undefined, folder);
    }
  }
  fs.readdir(folder, function (err, subfolders) {
    if (err) {
      callback(folder + ": " + err, folder);
    }
    for(i in subfolders) {
      (function (subfolder) {
        fs.stat(subfolder, function (err, stats) {
          if (err) {
            callback(subfolder + ": " + err, subfolder);
          }
          if (stats.isDirectory()) {
            finder(subfolder, options, callback);
          } else {
            if (options.scantype === 'file' || options.scantype === 'all') {
              if (options.regex === false) {
                callback(undefined, subfolder);  
              } else if (subfolder.match(options.regex)) {
                callback(undefined, subfolder);
              }
            }
          }
        });
      })(path.join(folder, subfolders[i]));
    }
  });  
};


/*
 * Main exports of module
 */
exports.finder = finder;

