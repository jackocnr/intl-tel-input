module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  // config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // CSS compilation
    sass: {
      main: {
        options: {
          style: "compact"
        },
        files: {
          'build/css/intlTelInput.css': 'src/css/intlTelInput.scss'
        }
      },
      demo: {
        files: {
          'build/css/demo.css': 'src/css/demo.scss'
        }
      }
    },

    // JS Code Lint
    jshint: {
      all: "src/js/**/*.js",
      options: {
        // this is for data.js which sometimes has commas on the following line
        laxcomma: true
      }
    },

    // JS compilation
    uglify: {
      options: {
        banner: '/*\n'+
          '<%= pkg.name %> \n'+
          'version: <%= pkg.version %>\n'+
          'description: <%= pkg.description %>\n'+
          'repository: <%= pkg.repository.url %>\n'+
          'license: <%= pkg.license %>\n'+
          'author: <%= pkg.author %>\n'+
          '*/\n'+
          // wrap in UMD - see https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
          '(function (factory) {\n'+
          '    if (typeof define === "function" && define.amd) {\n'+
          '        // AMD. Register as an anonymous module.\n'+
          '        define(["jquery"], function($){factory($, window, document);});\n'+
          '    } else {\n'+
          '        // Browser globals\n'+
          '        factory(jQuery, window, document);\n'+
          '    }\n'+
          '}(function ($, window, document, undefined) {\n'+
          '"use strict";\n\n',
        footer: '\n\n}));\n'
      },
      dev: {
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: true
        },
        files: {
          'build/js/intlTelInput.js': ['src/js/intlTelInput.js', 'src/js/data.js']
        }
      },
      prod: {
        files: {
          'build/js/intlTelInput.min.js': ['src/js/intlTelInput.js', 'src/js/data.js']
        }
      }
    },

    // Auto-compilation of assets
    watch: {
      js: {
        files: "src/js/**/*.js",
        tasks: ["jshint", "uglify:dev"]
      },
      pluginCss: {
        files: ["src/css/flags.scss", "src/css/intlTelInput.scss"],
        tasks: "sass:main"
      },
      demoCss: {
        files: "src/css/demo.scss",
        tasks: "sass:demo"
      }
    },

    // This is needed for travis task
    bower: {
      install: {
        // defaults are fine
      }
    },

    // Testing
    jasmine: {
      src: [
        'src/js/data.js',
        'src/js/intlTelInput.js'
      ],
      options: {
        vendor: [
          'lib/jquery/dist/jquery.js',
          'lib/jasmine-jquery/lib/jasmine-jquery.js'
        ],
        helpers: [
          'src/spec/helpers/**/*.js'
        ],
        specs: [
          'src/spec/tests/**/*.js'
        ],
        outfile: 'spec.html',
        keepRunner: true
      }
    },

    template: {
      defaultCountryIp: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/default-country-ip.html',
        variables: function () {
          return {
            title: "defaultCountry",
            desc: "Use IP address lookup to set the defaultCountry to the user's country.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/js/defaultCountryIp.js'),
            script: "defaultCountryIp.js"
          }
        }
      },
      modifyCountryData: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/modify-country-data.html',
        variables: function () {
          return {
            title: "getCountryData",
            desc: "Use static getCountryData() to update the data to only show localised country names.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/js/modifyCountryData.js'),
            script: "modifyCountryData.js"
          }
        }
      },
      onlyCountries: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/only-countries-europe.html',
        variables: function () {
          return {
            title: "onlyCountries",
            desc: "Set onlyCountries array to just European country codes.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/js/onlyCountriesEurope.js'),
            script: "onlyCountriesEurope.js"
          }
        }
      },
      defaultStyling: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/default-styling.html',
        variables: function () {
          return {
            title: "defaultStyling",
            desc: "The 3 different settings for the defaultStyling option: 'inside' (default), 'outside' and 'none'.",
            stylesheet: 'defaultStyling.css',
            markup: grunt.file.read('examples/partials/defaultStyling.html'),
            code: grunt.file.read('examples/js/defaultStyling.js'),
            script: "defaultStyling.js"
          }
        }
      },
      countrySync: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/country-sync.html',
        variables: function () {
          return {
            title: "Country sync",
            desc: "Use getCountryData to create a separate country dropdown for an address form, and then listen for change events to keep the two dropdowns in sync.",
            stylesheet: 'countrySync.css',
            markup: grunt.file.read('examples/partials/countrySync.html'),
            code: grunt.file.read('examples/js/countrySync.js'),
            script: "countrySync.js"
          }
        }
      },
      validation: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/validation.html',
        variables: function () {
          return {
            title: "isValidNumber",
            desc: "Use Google's libphonenumber to validate the telephone number on the change event.",
            stylesheet: '',
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/js/validation.js'),
            script: "validation.js"
          }
        }
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json', 'intl-tel-input.jquery.json'],
        //updateConfigs: ['pkg']
      }
    }

  });


  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['jshint', 'sass', 'uglify']);
  // just javascript
  grunt.registerTask('js', ['jshint', 'uglify']);
  // build examples
  grunt.registerTask('examples', ['template']);
  // Travis CI
  grunt.registerTask('travis', ['bower', 'jasmine']);
  // prepare everything for the demo.html
  grunt.registerTask('demo', ['jshint', 'sass', 'uglify:dev']);
  // bump version number in 3 files, build to update js headers, then commit, tag and push
  grunt.registerTask('release', ['bump-only', 'build']);

};