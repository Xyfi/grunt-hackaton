/*global module:false*/
const sass = require("node-sass");

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("package.json"),
    assetsDest: "./artifact/assets",
    jsSource: "./source-files/js",

    // config
    copy: {
      default: [ "js", "php" ],
      js: {
        expand: true,
        src: "vendor/**/*.js",
        dest: "<%= assetsDest %>/js",
        cwd: "<%= jsSource %>"
      },
      php: {
        files: [
          {
            expand: true,
            src: "./index.php",
            dest: "./artifact",
            cwd: "source-files"
          },
          {
            expand: true,
            src: "./classes/**/*.php",
            dest: "<%= assetsDest %>",
            cwd: "source-files"
          },
        ],
      },
    },
    sass: {
      options: {
        implementation: sass,
      },
      default: {
        files: [ {
          expand: true,
          dest: "<%= assetsDest %>",
          cwd: "source-files",
          src: "./css/**/*.{css,scss}",
        } ],
      }
    },
    uglify: {
      default: {
        files: [ {
          expand: true,
          dest: "<%= assetsDest %>/js",
          cwd: "<%= jsSource %>",
          src: [
            "**/*.js",
            "!vendor/**",
          ],
        } ],
      }
    },
    compress: {
      options: {
        archive: "archive.zip",
        mode: "zip",
      },
      default: {
        files: [ {
          expand: true,
          cwd:  "./artifact/",
          src: "**",
          dest: "/",
        } ],
      }
    },
    clean: [ "artifact" ],
  });

  // Load tasks here.
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-sass");

  // Define aliases here.
  grunt.registerTask("artifact", ["copy", "uglify", "sass", "compress", "clean"]);
  grunt.registerTask("default", "artifact");
};
