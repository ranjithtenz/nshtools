#!/usr/bin/env node
var nsh = require('nshtools');

nsh.getOption('--ignore-this', nsh.NoOp);
nsh.echo("That was rather pointless");
