#!/usr/bin/env node
if (require.paths.indexOf('./') < 0) {
  require.paths.push('./');
}
var nshtools = require('nshtools'), files = [];


/* Try globbing this folder we should find nshtools.js */
nsh = nshtools.createNshtool();

nsh.echo("Scanning for test-nshtools-globFolder.js.  Last statement should be success.");

nsh.globFolder(undefined,'.js$', function (err, path) {
  if (path.match(/test-nshtools-globFolder.js$/)) {
    nsh.echo("Success: Found " + path);
    process.exit(0);
  } else {
    nsh.echo("Scanning: " + path);
  }
});

