/**
 * mimetype.js - Simple methods for determining mime type from file extensions.
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
var fs = require('fs'), 
    path = require('path');

/* Pre-load a set of common mime types. */
mime_type = { '.txt' : 'text/plain',
              '.html' : 'text/html',
              '.htm' : 'text/html',
              '.css' : 'text/css',
              '.js' : 'application/javascript',
              '.json' : 'text/json',
              '.gif' : 'image/gif',
              '.jpg' : 'image/jpg',
              '.jpeg' : 'image/jpg',
              '.png' : 'image/png' };


/**
 * updateFromFile - update the mime_type object from a JSON file containing an 
 * a hash of file extensions (e.g. .txt) and
 * mime type strings (e.g. text/plain).
 *
 * @param json_filename - the file to merge mime type data from.
 */
exports.updateFromFile = function (json_filename) {
  fs.readFile(json_filename, function (err, data) {
    var obj;
    
    if (err) {
      throw new Error("Can't read " + json_filename + ': ' + err.toString());
    }
    try {
      obj = JSON.parse(data);  
    } catch(json_parse_error) {
      throw new Error(json_filename + ": " + json_parse_error.toString());
    }
    for (k in obj) {
      mime_type[k] = obj[k];
    }
  });
};

/**
 * getMimeType - given a path to a disc resource determine mime type.
 * In this simple implementation this is done by checking a hash table
 * of filename extensions and mime type strings.  This should eventually
 * be replaced by something that does a little more serious checking.
 *
 * @param resource_path - the filename you want to check.
 * @return a mime type string or default unknown/unknown if mime type cannot be determined.
 */
exports.getMimeType = function (resource_path) {
  var ext = path.extname(resource_path);
  if (mime_type[ext] !== undefined) {
    return mime_type[ext];
  }
  return 'unknown/unknown';
};

