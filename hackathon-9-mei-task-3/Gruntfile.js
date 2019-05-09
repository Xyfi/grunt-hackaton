const updateVersion = require( "./custom-tasks/update-version" );

/*global module:false*/
module.exports = function(grunt) {
  // Load tasks here.

  // Define aliases here.
  grunt.registerTask('default', 'My default task description', function() {
    grunt.log.writeln( 'This is the default grunt task, create a new task and configure.' );
  });

  grunt.registerTask( "update-version", updateVersion() );

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
  });
};
