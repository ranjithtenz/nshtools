/**
 * os-utils - JavaScript implementations of basic OS type utilities (e.g. cp, mv, ls)
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
    path = require('path');

/**
 * echo - print a line to the console with or without a new line.
 * @param text - the message to print.
 * @param nonl (optional) - if present suppress the final new line.
 */
echo = function (text, nonl) {
  if (nonl === undefined) {
    sys.puts(text);
  } else {
    sys.print(text);
  }
};


/**
 * cp - copy a file. All three parameters are required.
 * @param source_path - the filename for the copy source
 * @param target_path - the filename (not directory name) of the copy target
 * @param callback - the callback to fire as a result of the copy. If an error occurs
 * then an error message is passed to the callback. Otherwise no parameters are passed.
 */
cp = function (source_path, target_path, callback) {
  var self = this;
  if (callback === undefined) {
    callback = self.NoOp;
  }

  /* FIXME: need to handle case of copying directories */
  fs.readFile(source_path,{'encoding' : 'binary'}, function (read_error, content) {
    if (read_error) {
      callback('cp: ' + source_path + ' ' + target_path + ': ' + read_error);
      return;
    }
    fs.writeFile(target_path, content, function (write_error) {
      if (write_error) {
        callback('cp: ' + source_path + ' ' + target_path + ': ' + write_error);
        return;
      } 
      if (self.verbose) {
        sys.puts(source_path + " -> " + target_path);
      }
      callback(undefined);
    });
  });
};


/**
 * mv = copy a file to a new one removing the original after completion. 
 * All three parameters are required.
 * @param source_path - the filename for the move source path
 * @param target_path - the filename (not directory name) of the move target
 * @param callback - the callback to fire as a result of the move. If an error occurs
 * then an error message is passed when the callback is fired otherwise no parameters are passed.
 */
mv = function (source_path, target_path, callback) {
  var self = this;
  if (callback === undefined) {
    callback = self.NoOp;
  }

  /* FIXME: need to handle case of moving directories */
  fs.readFile(source_path, {'encoding' : 'binary'}, function (read_error, content) {
    if (read_error) {
      callback('mv: ' + source_path + ' ' + target_path + ': ' + read_error);
      return;
    }
    fs.writeFile(target_path, content, function (write_error) {
      if (write_error) {
        callback('mv: ' + source_path + ' ' + target_path + ': ' + write_error);
        return;
      }
      if (self.verbose) {
        sys.puts(source_path + " -> " + target_path);
      }
      fs.unlink(source_path, function (unlink_error) {
        if (unlink_error) {
          callback('mv: ' + source_path + ' ' + target_path + ': ' + unlink_error);
        }
        if (callback !== undefined) {
          callback(undefined);
        }
      });
    });
  });
};


/*
 * Main exports of nsthools' module
 */
exports.echo = echo;
exports.cp = cp;
exports.mv = mv;
exports.die = die;

/*
 * Basic aliases for CommonJS interoperability
 */
exports.ls = fs.readdir;
exports.listDirectory = fs.readdir;
exports.copy = cp;
exports.move = mv;
exports.remove = fs.unlink;
exports.makeDirectory = fs.mkdir;
exports.removeDirectory = fs.rmdir;

