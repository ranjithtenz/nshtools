#!/usr/bin/env node
var nsh = require('nshtools');

nsh.getOption('--hello', function(error, value) {
  if (error) {
    nsh.echo("Try running this with --hello=Me and see what happens.");
    return;
  }
  nsh.echo("Hello " + value);
});

