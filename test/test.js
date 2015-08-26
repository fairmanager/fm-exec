// jscs:disable disallowAnonymousFunctions, requireNamedUnassignedFunctions, requireSpaceAfterKeywords
var should = require( "should" );

var exec = require( "../lib" );

describe( "fm-exec", function() {
	it( "should execute something", function( done ) {
		exec( "echo" )
			.then( done )
			.catch( done );
	} );

	it( "should fail for invalid binaries", function( done ) {
		exec( "SHOULD_NOT_EXIST" )
			.then( function() {
				done( new Error( "exec should fail for nonexistent binaries" ) );
			} )
			.catch( function( error ) {
				done();
			} );
	} );

	it( "should not fail for invalid binaries, when ignoreFailure is set", function( done ) {
		exec( "SHOULD_NOT_EXIST", [], {
			ignoreFailure : true
		} )
			.then( function( result ) {
				result.should.be.an.instanceOf( Error );
				done();
			} )
			.catch( done );
	} );

	it( "should buffer output if instructed", function( done ) {
		exec( "echo", [ "lol" ], {
			buffer : true
		} )
			.then( function( result ) {
				result.should.have.property( "stdout" ).with.type( "string" ).and.equal( "lol" );
				done();
			} )
			.catch( done );
	} );
} );
