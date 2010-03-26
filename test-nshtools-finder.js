#!/usr/bin/env node
if (require.paths.indexOf('./') < 0) {
  require.paths.push('./');
}
var nshtools = require('nshtools'), files = [];


/* Try globbing this folder we should find nshtools.js */
nsh = nshtools.createNshtool();

nsh.echo("Scanning for test-nshtools-finder.js.  Last statement should be success.");


re = new RegExp('.js$');
nsh.finder('.', {'RegExp' : re, 'scantype' : 'file'}, function (err, path) {
  if (path.match(/test-nshtools-finder.js$/)) {
    nsh.echo("Success: Found " + path);
  }
});


// FIXME: need to add check for subfolder searching too.  Replace process.exit with something else to allow more complete testing!
