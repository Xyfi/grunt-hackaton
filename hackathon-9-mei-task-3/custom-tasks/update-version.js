const grunt = require( "grunt" );
const fs = require("fs");
const path = require("path");
const semver = require("semver");

module.exports = function() {
	let version = null;

	if ( grunt.cli.tasks.length > 1 && grunt.cli.tasks[ 0 ] === "update-version" ) {
		version = grunt.cli.tasks[ 1 ];
		grunt.registerTask( grunt.cli.tasks[ 1 ], () => {} );
	}

	return function() {
		grunt.task.clearQueue();

		grunt.log.writeln( "Setting version: " + version );

		updateIndexPhpVersion( version );
	};
};

function updateIndexPhpVersion( version ) {
	const indexPhp = path.resolve( process.cwd(), "source-files", "index.php" );
	const content = fs.readFileSync( indexPhp, "utf8" );

	const versionPrefix = " \* Version:     ";

	const versionLineRegex = new RegExp( " \\* Version:     .+", "g" );
	const versionLineMatch = content.match( versionLineRegex );

	if ( versionLineMatch.length < 1 ) {
		grunt.log.warn( "Nothing changed in index.php!" );
		return false;
	}

	const words      = versionLineMatch[ 0 ].split( " " );
	const oldVersion = words[ words.length - 1 ];

	grunt.log.writeln( `Replacing ${ oldVersion } with ${ version }` );

	if ( semver.gt( oldVersion, version ) ) {
		grunt.log.warn( "Warning: Old version is higher that provided version!" );
	}

	const newContent = content.replace( versionLineRegex, versionPrefix + version );

	if ( content === newContent ) {
		grunt.log.warn( "Nothing changed in index.php!" );
	}

	fs.writeFileSync( indexPhp, newContent );
}
