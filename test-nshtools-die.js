#!/usr/bin/env node
if (require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}
var nshtools = require('nshtools');
nsh = nshtools.createNshtool();

nsh.echo("We should die next.");
nsh.die("This should be the last statement.");
nsh.echo("Ooops: something went wrong.");
