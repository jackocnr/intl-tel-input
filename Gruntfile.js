module.exports = function(grunt) {

	// config
	grunt.initConfig({
		sass: {
			build: {
				files: {
					'build/css/intlTelInput.css': [
						'src/css/flags16.scss',
						'src/css/intlTelInput.scss'
					],
					'build/css/demo.css': 'src/css/demo.scss'
				}
			}
		},
		jshint: {
			all: "src/js/**/*.js",
			options: {
				laxcomma: true
			}
		},
		concat: {
			dev: {
				files: {
				  'build/js/intlTelInput.js': ['src/js/**/*.js']
				}
			}
		},
		uglify: {
			build: {
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
			css: {
				files: "src/css/**/*.scss",
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
	grunt.registerTask('default', ['jshint', 'sass:build', 'uglify:build', 'concat:dev']);

};