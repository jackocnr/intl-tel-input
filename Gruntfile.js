module.exports = function(grunt) {

  // config
  grunt.initConfig({
    sass: {
      main: {
        files: {
          'build/css/intlTelInput.css': [
            'src/css/intlTelInput.scss',
            'src/css/flags16.scss'
          ],
        }
      },
      demo: {
        files: {
          'build/css/demo.css': 'src/css/demo.scss'
        }
      }
    },
    jshint: {
      all: "src/js/**/*.js",
      options: {
        // this is for data.js which sometimes has commas on the following line
        laxcomma: true
      }
    },
    concat: {
      all: {
        files: {
          'build/js/intlTelInput.js': ['src/js/**/*.js']
        }
      }
    },
    uglify: {
      all: {
        files: {
          'build/js/intlTelInput.min.js': ['src/js/**/*.js']
        }
      }
    },
    watch: {
      js: {
        files: "src/js/**/*.js",
        tasks: ["jshint", "concat"]
      },
      pluginCss: {
        files: ["src/css/flags16.scss", "src/css/intlTelInput.scss"],
        tasks: "sass:main"
      },
      demoCss: {
        files: "src/css/demo.scss",
        tasks: "sass:demo"
      }
    }
  });

  // plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // tasks
  grunt.registerTask('default', ['jshint']);
  // default is to build everything ready for a commit
  grunt.registerTask('all', ['jshint', 'sass:main', 'sass:demo', 'uglify:all', 'concat:all']);
  // prepare everything for the demo.html
  grunt.registerTask('demo', ['jshint', 'sass:main', 'sass:demo', 'concat:all']);

};