#!/usr/bin/env node

nsh = require(process.cwd() + '/nshtools');
nsh.echo("Try some interactive prompting.");
nsh.prompt('Q1? ',function (response) { nsh.echo('A1: ' + response) });
nsh.prompt('Q2? ',function (response) { nsh.echo('A2: ' + response) });
nsh.prompt('Q3? ',function (response) { nsh.echo('A3: ' + response) });
nsh.prompt('Did you answer Q1-Q3? (Y/N) ',function (response) { 
  if (response.toUpperCase().trim() === 'Y') {
    nsh.echo('Success'); 
  } else {
    nsh.echo('Failed: more work to do debugging nshtools.');
  }
});
nsh.run();

