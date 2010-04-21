#!/usr/bin/env node
nsh = require(process.cwd() + '/nshtools');

nsh.task("Task 1", nsh.NoOp);
nsh.task("Task 2", nsh.NoOp);
nsh.task("Task 3", nsh.NoOp);
nsh.task("Should have run three tasks by now.", nsh.NoOp);
nsh.run();
