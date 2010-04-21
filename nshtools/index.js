#!/usr/bin/env node
/**
 * A collection of objects and methods to help make shell scripting/batch
 * processing easier using NodeJS.
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

const version = '0.0.3x';
const release = '2010.04.21';

var sys = require('sys'),
    fs = require('fs');
    
/* 
 * Pull in submodules and expose them as parts of nshtools 
 */

/**
 * Test is a simple unit test object. It's a little more verbose then msjunit
 */
var test = require('./test');
exports.Test = test.Test;

/**
 * nshtools integrates some useful simple data structures (i.e. Stacks, Queues).
 * Stack(), Queue() functions which return a new stack or queue.
 */
var ds = require('./ds');
exports.Stack = ds.Stack;
exports.Queue = ds.Queue;


/* mimetype - implements simple mime type calculation based on file extensions */
var mimetype = require('./mimetype');
exports.mimetype = mimetype;
exports.mimetype.updateFromFile = mimetype.updateFromFile;
exports.mimetype.getMimeType = mimetype.getMimeType;

/* option - a simple command line option processor */
var option = require('./option');
exports.parseArgs = option.parseArgs;
exports.getOption = option.getOption;
exports.getArgs = option.getArgs;


/* tpr - Tasks, Prompts and Run; a system for managing starting tasks, prompting the user
   and running interaction between the two */
var tpr = require('./tpr');
exports.task = tpr.task;
exports.prompt = tpr.prompt;
exports.run = tpr.run;
exports.NoOp = tpr.NoOp;
exports.die = tpr.die;

/* finder - a basic finder object which traverses file system and triggers callbacks */
var finder = require('./finder');
exports.finder = finder.finder;

/*
 * Re-create some common Unix style file system primitives. 
 */
var os = require('./os-utils');

/*
 * Main exports of nsthools' module
 */
exports.version = version;
exports.release = release;
exports.echo = os.echo;
exports.cp = os.cp;
exports.mv = os.mv;
exports.rm = fs.unlink;
exports.mkdir = fs.mkdir;
exports.rmdir = fs.rmdir;
exports.readFile = fs.readFile;
exports.writeFile = fs.writeFile;
exports.stat = fs.stat;
exports.unlink = fs.unlink;
exports.puts = sys.puts;
exports.print = sys.print;
exports.inspect = sys.inspect;
exports.ENV = process.ENV
exports.argv = process.argv;
exports.LOGNAME = process.ENV.LOGNAME;


