/*global module:false*/
const sass = require("node-sass");

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("package.json"),
    assets: "./artifact/assets",

    // config
    copy: {
      default: [ "js", "html" ],
      js: {
        expand: true,
        src: "**/*.js",
        dest: "<%= assets %>",
        cwd: "source-files"
      },
      html: {
        src: "./index.html",
        dest: "./artifact/",
      }
    },
    sass: {
      options: {
        implementation: sass,
      },
      default: {
        files: {
          "<%= assets %>/style.css": "./source-files/style.scss",
        }
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
  grunt.loadNpmTasks("grunt-sass");

  // Define aliases here.
  grunt.registerTask("default", ["copy", "sass", "compress", "clean"]);
};
