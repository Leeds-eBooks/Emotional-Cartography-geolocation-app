/*

Default Gruntfile for AppGyver Steroids
http://www.appgyver.com
Licensed under the MIT license.

*/

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-steroids");
  grunt.loadNpmTasks("grunt-babel");

  grunt.initConfig({
    babel: {
      dist: {
        files: {
          "dist/scripts/application-compiled.js": "dist/scripts/application.js"
        }
      }
    }
  });

  grunt.registerTask("default", [
    "steroids-make-fresh",
    "babel"
  ]);
}
