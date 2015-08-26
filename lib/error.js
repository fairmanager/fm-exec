"use strict";

var util = require( "util" );

module.exports.ExecutionError = ExecutionError;

function ExecutionError( message ) {
	var error    = Error.call( this, message );
	error.buffer = {
		stdout : null,
		stderr : null
	};
	return error;
}
util.inherits( ExecutionError, Error );
