#!/usr/bin/env node
nsh = require('nshtools');

nsh.cp('/tmp/file1.txt','/tmp/file2.txt', function (error) {
  if (error) {
    nsh.echo("Oops, something went wrong: " + error);
    return;
  }
  nsh.echo("Success!");
});

