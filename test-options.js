#!/usr/bin/env node
nsh = require(process.cwd() + '/nshtools');
nsh.echo("Running automated tests.");
argv = ['node', 'test-options.js'];
argv.push("--test='hello world'");
nsh.parse(argv);

nsh.getOption('--test', function (test_error, value) {
  if (test_error) {
    nsh.echo("Try running: node test-nshtools.getOption.js --test='hello world'");
    return;
  }
  nsh.echo("OK, --test returned [" + value + "]");
});

option_test = '--testme="Hello World"';
argv.push(option_test);
nsh.parse(argv);
nsh.getOption('--testme', function (testme_error, value) {
  if (testme_error) {
    nsh.echo("Failed: should have found the --testme option. " + testme_error);
  } else {
    if (value.trim() === 'Hello World') {
      nsh.echo("Ok, --testme returned [" + value + "]");  
    } else {
      nsh.echo("ERROR: Get unexpected wrong value, expect [Hello World] got [" + value + "]");
    }
  }
});
nsh.getOption('--testme', function (testme_error, value) {
  if (testme_error) {
    nsh.echo("Success: last call should have removed --testme option. " + testme_error);
  } else {
    nsh.echo("Failed: should not still have --testme in nsh.argv list returned " + value);
  }
});

nsh.echo("Testing Short Option (-t):");
argv.push('-t');
nsh.parse(argv);
nsh.getOption('-t', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -t');
  if (arg === undefined) {
    nsh.echo('OK, found -t with related arg undefined OK.');
  }
});

nsh.echo("Testing Short Option (-t optional_arg):");
argv.push('-t');
argv.push('optional_arg');
nsh.parse(argv);
nsh.getOption('-t', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  if (arg === 'optional_arg') {
    nsh.echo('OK, found -t optional_arg.');
  } else {
    nsh.echo('Oops, found -t but not "optional_arg" [' + arg + ']');
  }
});

nsh.echo("Testing Combined short Options (-zxvf):");
argv.push('-zxvf');
nsh.parse(argv);
nsh.getOption('-z', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -z');
  if (arg !== undefined) {
    nsh.echo("Oops, stole arg from something: " + arg);
  }
});
nsh.getOption('-x', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -x');
  if (arg !== undefined) {
    nsh.echo("Oops, stole arg from something: " + arg);
  }
});
nsh.getOption('-v', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -v');
  if (arg !== undefined) {
    nsh.echo("Oops, stole arg from something: " + arg);
  }
});
nsh.getOption('-f', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -f');
  if (arg === undefined) {
    nsh.echo('Ok, did not define additional arg');
  }
});

argv = ['node', 'test-getOption.js', '-zxvf', 'test.txt'];
nsh.parse(argv);
nsh.echo("Testing Short Option (-zxvf optional_arg):");
nsh.getOption('-z', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -z');
  if (arg !== undefined) {
    nsh.echo("Oops, stole arg from something: " + arg);
  }
});
nsh.getOption('-x', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -x');
  if (arg !== undefined) {
    nsh.echo("Oops, stole arg from something: " + arg);
  }
});
nsh.getOption('-v', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -v');
  if (arg !== undefined) {
    nsh.echo("Oops, stole arg from something: " + arg);
  }
});
nsh.getOption('-f', function(t_error, arg) {
  if (t_error) {
    nsh.echo("Oops should have found this: " + t_error);
  }
  nsh.echo('OK, found -f');
  if (arg === undefined) {
    nsh.echo('Oops, found -f without option_arg [' + nsh.inspect(arg) + '].' + nsh.inspect(argv));
  } else {
    nsh.echo('Ok, -f ' + arg);
  }
});


