module.exports = function(grunt) {

  // timestamp in asset URLs for cache busting
  var time = (new Date()).getTime();

  return {

    // this is the first step in generating the actual plugin main JS file
    jsAddVersion: {
      src: 'src/js/intlTelInput.js',
      dest: 'tmp/versioned.js',
      options: {
        data: (function(version) {
          return {
            version: version,
          };
        })('<%= package.version %>')
      }
    },

    // generate the JS scripts for the examples (and cache-bust the utils.js URL)
    nationalModeJs: {
      src: 'examples/js/nationalMode.js.ejs',
      dest: 'examples/gen/js/nationalMode.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    defaultCountryIpJs: {
      src: 'examples/js/defaultCountryIp.js.ejs',
      dest: 'examples/gen/js/defaultCountryIp.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    modifyCountryDataJs: {
      src: 'examples/js/modifyCountryData.js.ejs',
      dest: 'examples/gen/js/modifyCountryData.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    onlyCountriesEuropeJs: {
      src: 'examples/js/onlyCountriesEurope.js.ejs',
      dest: 'examples/gen/js/onlyCountriesEurope.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    countrySyncJs: {
      src: 'examples/js/countrySync.js.ejs',
      dest: 'examples/gen/js/countrySync.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    isValidNumberJs: {
      src: 'examples/js/isValidNumber.js.ejs',
      dest: 'examples/gen/js/isValidNumber.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    hiddenInputJs: {
      src: 'examples/js/hiddenInput.js.ejs',
      dest: 'examples/gen/js/hiddenInput.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    initPromiseJs: {
      src: 'examples/js/initPromise.js.ejs',
      dest: 'examples/gen/js/initPromise.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    multipleInstancesJs: {
      src: 'examples/js/multipleInstances.js.ejs',
      dest: 'examples/gen/js/multipleInstances.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },
    displayNumberJs: {
      src: 'examples/js/displayNumber.js.ejs',
      dest: 'examples/gen/js/displayNumber.js',
      options: {
        data: function() {
          return { time: time };
        }
      }
    },

    // generate the HTML example pages
    nationalMode: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/national-mode.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "National Mode",
            desc: "Allow users to enter their national number, and then convert it to international format using the public method getNumber.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/nationalMode.html'),
            code: grunt.file.read('examples/gen/js/nationalMode.js'),
            script: "nationalMode.js"
          };
        }
      }
    },
    defaultCountryIp: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/default-country-ip.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Lookup user's country",
            desc: "Set initialCountry to 'auto' and pass in a function for geoIpLookup to perform a JSONP request to ipinfo.io, which returns the user's country based on their IP address.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/defaultCountryIp.html'),
            code: grunt.file.read('examples/gen/js/defaultCountryIp.js'),
            script: "defaultCountryIp.js"
          };
        }
      }
    },
    modifyCountryData: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/modify-country-data.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Modify country data",
            desc: "Use static getCountryData method to update the data to only show localised country names.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/gen/js/modifyCountryData.js'),
            script: "modifyCountryData.js"
          };
        }
      }
    },
    onlyCountriesEurope: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/only-countries-europe.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "European countries",
            desc: "Set onlyCountries option to just European country codes.",
            stylesheet: "",
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/gen/js/onlyCountriesEurope.js'),
            script: "onlyCountriesEurope.js"
          };
        }
      }
    },
    countrySync: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/country-sync.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Country sync",
            desc: "Use static getCountryData method to create a separate country dropdown for an address form, and then listen for change events to keep the two dropdowns in sync.",
            stylesheet: 'countrySync.css',
            markup: grunt.file.read('examples/partials/countrySync.html'),
            code: grunt.file.read('examples/gen/js/countrySync.js'),
            script: "countrySync.js"
          };
        }
      }
    },
    isValidNumber: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/is-valid-number.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Validation",
            desc: "Use the isValidNumber method (which utilises Google's libphonenumber) to validate the telephone number on the blur event.",
            stylesheet: 'isValidNumber.css',
            markup: grunt.file.read('examples/partials/isValidNumber.html'),
            code: grunt.file.read('examples/gen/js/isValidNumber.js'),
            script: "isValidNumber.js"
          };
        }
      }
    },
    hiddenInput: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/hidden-input.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Submitting the full international number using a hidden input",
            desc: "If you're submitting the form using Ajax, simply use getNumber to get the full international number before sending it. If you're using the standard form POST method, you can use the hiddenInput option to automatically create a hidden input that gets populated with the full international number on submit. Try submitting a valid number below, and then check the 'full_phone' parameter in the URL.",
            stylesheet: '',
            markup: grunt.file.read('examples/partials/hiddenInput.html'),
            code: grunt.file.read('examples/gen/js/hiddenInput.js'),
            script: "hiddenInput.js"
          };
        }
      }
    },
    initPromise: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/init-promise.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Using the promise returned from initialisation",
            desc: "Use this promise to know when the plugin has completely finished initialising, including completing any asynchronous actions you might have enabled with the initialisation options e.g. fetching utils.js with the utilsScript option, and performing the ip lookup with the geoIpLookup option.",
            stylesheet: '',
            markup: grunt.file.read('examples/partials/initPromise.html'),
            code: grunt.file.read('examples/gen/js/initPromise.js'),
            script: "initPromise.js"
          };
        }
      }
    },
    multipleInstances: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/multiple-instances.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Multiple Instances",
            desc: "Here you can see multiple instances of the plugin working alongside each other. I've set the placeholderNumberType differently for each instance to highlight that the instances are completely independent of each other.",
            stylesheet: '',
            markup: grunt.file.read('examples/partials/multipleInstances.html'),
            code: grunt.file.read('examples/gen/js/multipleInstances.js'),
            script: "multipleInstances.js"
          };
        }
      }
    },
    displayNumber: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/display-number.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Display an existing number",
            desc: "We initialise the plugin on an input which already contains a full international number. The plugin will automatically select the relevant flag, and re-format the number to national format.",
            stylesheet: '',
            markup: grunt.file.read('examples/partials/displayNumber.html'),
            code: grunt.file.read('examples/gen/js/displayNumber.js'),
            script: "displayNumber.js"
          };
        }
      }
    },
  };
};
