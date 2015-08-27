fm-exec
=======

What?
-----
Helper to spawn external applications.

- uses `child_process.spawn()` be default
- uses promises
- allows you to use the same signature for `spawn` and `exec` calls

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