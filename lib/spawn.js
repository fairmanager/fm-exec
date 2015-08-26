"use strict";

var Promise = require( "bluebird" );

var errors = require( "./error" );
var spawn  = require( "child_process" ).spawn;

/**
 * Execute a command and redirect the output to the parent process
 * @param {String} command The command to run.
 * @param {Array<String>} args And array of arguments to pass to the command.
 * @param {Object} [options] Can contain the following parameters:
 * buffer Should application output be buffered for later retrieval? Default to false
 * cwd Set the working directory for the spawned process. Defaults to process.cwd
 * emit Should received data from the child be emitted on the parent IO? Defaults to false
 * log A function that will receive application output. Default to noop
 * ignoreFailure Should errors be ignored. Default to false
 * @returns {Promise}
 */
function execute( command, args, options ) {
	options               = options || {};
	options.buffer        = options.buffer === true;
	options.cwd           = options.cwd || process.cwd;
	options.emit          = options.stdio === true;
	options.log           = options.log || Function.prototype;
	options.ignoreFailure = options.ignoreFailure === true;

	// Normalize args
	args = args || [];

	options.buffer = !options.buffer ? options.buffer : {
		stdout : null,
		stderr : null
	};

	//noinspection JSValidateTypes
	return new Promise( function resolver( resolve, reject ) {
		var childProcess = spawn( command, args, {
			cwd : options.cwd
		} );

		childProcess.on( "error", options.ignoreFailure ? resolve : reject );

		childProcess.on( "close", function onClose( code, signal ) {
			if( 0 === code || options.ignoreFailure ) {
				if( options.buffer ) {
					resolve( options.buffer );

				} else {
					resolve();
				}

			} else {
				var errorMessage = "Process exited with non-0 return code: " + code;
				if( signal ) {
					errorMessage += " Signal: " + signal;
				}
				var error    = new errors.ExecutionError( errorMessage );
				error.buffer = options.buffer;
				reject( error );
			}
		} );

		childProcess.stdout.on( "data", function onData( data ) {
			var buffer = data.toString();
			buffer     = buffer.replace( /(\r|\r?\n)$/, "" );
			options.log( buffer );
			if( options.emit ) {
				process.stdout.write( data );
			}

			if( options.buffer ) {
				options.buffer.stdout = options.buffer.stdout || "";
				options.buffer.stdout += buffer;
			}
		} );

		childProcess.stderr.on( "data", function onError( data ) {
			var buffer = data.toString();
			buffer     = buffer.replace( /(\r|\r?\n)$/, "" );
			options.log( buffer );
			if( options.emit ) {
				process.stderr.write( data );
			}

			if( options.buffer ) {
				options.buffer.stderr = options.buffer.stderr || "";
				options.buffer.stderr += buffer;
			}
		} );
	} );
}

module.exports = execute;
