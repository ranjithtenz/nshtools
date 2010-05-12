#!/usr/bin/env node
/**
 * Simple tests for nshtools module.
 */

if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}
if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}
var nsh = require('nshtools'),
    files = [];

nsh.verbose = true;

nsh.echo("Scanning for test-finder.js.  Last statement should be success.");

re = new RegExp('.js$');
nsh.finder('.', {'RegExp' : re, 'scantype' : 'file'}, function (err, path) {
  if (path.match(/test-finder.js$/)) {
    nsh.echo("Success: Found " + path);
  }
});


