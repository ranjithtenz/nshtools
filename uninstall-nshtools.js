#!/usr/bin/env node

if(require.paths.indexOf(process.cwd()) < 0) {
  require.paths.push(process.cwd());
}
if(require.paths.indexOf('.') < 0) {
  require.paths.push('.');
}


/* Bootstrap nshtools installation. */
var nsh = require(process.cwd() + '/nshtools');

nsh.getOption('--prefix', function(prefix_error, prefix_path) {
  nsh.bin_path = '/bin';
  if (prefix_error) {
    nsh.echo('Using default install prefix: ' + nsh.env.HOME);
    nsh.prefix_path = nsh.env.HOME;
    nsh.node_lib = '/.node_libraries';
  } else {
    nsh.prefix_path = prefix_path.trim();
    nsh.node_lib = '/lib/node/libraries';
  }
});
nsh.prompt("Do you want to uninstall nshtools.js in " + nsh.prefix_path + nsh.node_lib + "? (Y/N) ",
function (response) {
  if (response.toUpperCase().trim() === 'Y') {
    nsh.verbose = false;
    nsh.echo("\n\n\tUninstalling " + nsh.prefix_path + nsh.node_lib + "/nshtools.js ..." + new Date() + "\n");
    nsh.remove(nsh.prefix_path + nsh.node_lib + '/nshtools.js', function (remove_error) {
      if (remove_error) {
        nsh.die("Uninstall failed. " + remove_error + "\n");
      }
      nsh.echo("\nnshtools uninstall complete. " + new Date() + "\n");
    });
  } else {
    nsh.echo("\n\n\tNo action taken. Nothing uninstalled. " + new Date() + "\n");
  }
});


nsh.run();

