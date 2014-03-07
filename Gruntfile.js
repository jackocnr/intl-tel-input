module.exports = function(grunt) {

  // load all tasks from package.json
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var time = (new Date()).getTime();

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
      dev: "src/js/**/*.js",
      build: "tmp/all.js",
      options: {
        // this is for data.js which sometimes has commas on the following line
        laxcomma: true
      }
    },

    // JS compilation
    uglify: {
      options: {
        banner: '/*\n'+
          'International Telephone Input v<%= pkg.version %>\n'+
          '<%= pkg.repository.url %>\n'+
          '*/\n'
      },
      dev: {
        options: {
          beautify: true,
          compress: false,
          mangle: false,
          preserveComments: true
        },
        files: {
          'build/js/intlTelInput.js': 'tmp/all.js'
        }
      },
      prod: {
        files: {
          'build/js/intlTelInput.min.js': 'tmp/all.js'
        }
      }
    },

    // Auto-compilation of assets
    watch: {
      js: {
        files: "src/js/**/*.js",
        tasks: "js"
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
      js: {
        src: 'src/js/wrapper.js.ejs',
        dest: 'tmp/all.js',
        variables: function () {
          return {
            plugin: grunt.file.read('src/js/intlTelInput.js'),
            data: grunt.file.read('src/js/data.js'),
          }
        }
      },
      defaultCountryIp: {
        src: 'examples/template.html.ejs',
        dest: 'examples/gen/default-country-ip.html',
        variables: function () {
          return {
            time: time,
            title: "Lookup user's country",
            desc: "Use IP address lookup to set the defaultCountry option to the user's country.",
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
            time: time,
            title: "Modify country data",
            desc: "Use static getCountryData method to update the data to only show localised country names.",
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
            time: time,
            title: "European countries",
            desc: "Set onlyCountries option to just European country codes.",
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
            time: time,
            title: "Styling",
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
            time: time,
            title: "Country sync",
            desc: "Use static getCountryData method to create a separate country dropdown for an address form, and then listen for change events to keep the two dropdowns in sync.",
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
            time: time,
            title: "Validation",
            desc: "Use public isValidNumber method (utilising Google's libphonenumber) to validate the telephone number on the change event.",
            stylesheet: 'validation.css',
            markup: grunt.file.read('examples/partials/validation.html'),
            code: grunt.file.read('examples/js/validation.js'),
            script: "validation.js"
          }
        }
      }
    },

    bump: {
      options: {
        files: ['package.json', 'bower.json', 'intl-tel-input.jquery.json'],
        updateConfigs: ['pkg'],
        commitFiles: ['-a'],
        pushTo: 'origin'
      }
    }

  });


  /**
   * TASKS
   */
  // build everything ready for a commit
  grunt.registerTask('build', ['template:js', 'jshint:build', 'sass', 'uglify']);
  // just javascript
  grunt.registerTask('js', ['template:js', 'jshint:build', 'uglify']);
  // build examples
  grunt.registerTask('examples', ['template']);
  // Travis CI
  grunt.registerTask('travis', ['bower', 'jasmine']);
  // bump version number in 3 files, build to update js headers, then commit, tag and push
  grunt.registerTask('version', ['bump-only', 'uglify', 'bump-commit']);

};