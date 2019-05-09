/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    // config
    copy: {
      default: [ 'js', 'html' ],
      js: {
        expand: true,
        src: "**/*.js",
        dest: "./artifact/",
        cwd: "source-files"
      },
      html: {
        src: './index.html',
        dest: "./artifact/",
      }
    },
    sass: {

    },
  });

  // Load tasks here.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Define aliases here.
  grunt.registerTask('default', ['copy']);
};
