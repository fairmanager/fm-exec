"use strict";

var errors = require( "./error" );
var shell  = require( "./shell" );
var spawn  = require( "./spawn" );

module.exports        = spawn;
module.exports.errors = errors;
module.exports.shell  = shell;
