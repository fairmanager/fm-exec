fm-exec
=======
[![](https://travis-ci.org/hartwig-at/fm-exec.svg?branch=master)](https://travis-ci.org/hartwig-at/fm-exec)
[![Coverage Status](https://coveralls.io/repos/hartwig-at/fm-exec/badge.svg?branch=master&service=github)](https://coveralls.io/github/hartwig-at/fm-exec?branch=master)
[![Code Climate](https://codeclimate.com/github/hartwig-at/fm-exec/badges/gpa.svg)](https://codeclimate.com/github/hartwig-at/fm-exec)
![GitHub license](https://img.shields.io/github/license/hartwig-at/fm-exec.svg)

What?
-----
Helper to spawn external applications.

- uses `child_process.spawn()` by default (using the shell is also possible, with `exec.shell`) 
- uses promises
- allows you to use the same signature for `spawn` and `exec` calls
- conveniently buffers process output, if desired

How?
----

Install

	npm install fm-exec

Usage

```js
var exec = require( "fm-exec" );

// Just run a binary. Returns a promise.
exec( "notepad" );

// Run a binary with arguments.
exec( "notepad", [ "foo.txt" ] );

// Buffer application output to receive it in resolution/rejection handler.
exec( "git", [ "rev-parse", "HEAD" ], {
	cwd    : applicationDirectory,
	buffer : true
} )
	.then( function echoVersion( version ) {
		console.log( version );
	} )
	.catch( function onError( error ) {
		// handle error
	} );

// Execute a command through the shell.
exec.shell( "notepad", [ "foo.txt" ] );
// When using exec.shell, this call is identical to the one above.
exec.shell( "notepad foo.txt" );
```
