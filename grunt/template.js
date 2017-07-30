module.exports = function(grunt) {

  // timestamp in asset URLs for cache busting
  var time = (new Date()).getTime();

  return {
    js: {
      src: 'src/js/wrapper.js.ejs',
      dest: 'tmp/wrapped.js',
      options: {
        data: (function(version) {
          return {
            plugin: grunt.file.read('src/js/intlTelInput.js'),
            version: version,
            data: grunt.file.read('src/js/data.js')
          };
        })('<%= package.version %>')
      }
    },
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
            code: grunt.file.read('examples/js/nationalMode.js'),
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
            markup: grunt.file.read('examples/partials/simpleInput.html'),
            code: grunt.file.read('examples/js/defaultCountryIp.js'),
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
            code: grunt.file.read('examples/js/modifyCountryData.js'),
            script: "modifyCountryData.js"
          };
        }
      }
    },
    onlyCountries: {
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
            code: grunt.file.read('examples/js/onlyCountriesEurope.js'),
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
            code: grunt.file.read('examples/js/countrySync.js'),
            script: "countrySync.js"
          };
        }
      }
    },
    validation: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/is-valid-number.html',
      options: {
        data: function() {
          return {
            time: time,
            title: "Validation",
            desc: "Use public isValidNumber method (utilising Google's libphonenumber) to validate the telephone number on the change event.",
            stylesheet: 'isValidNumber.css',
            markup: grunt.file.read('examples/partials/isValidNumber.html'),
            code: grunt.file.read('examples/js/isValidNumber.js'),
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
            code: grunt.file.read('examples/js/hiddenInput.js'),
            script: "hiddenInput.js"
          };
        }
      }
    }
  };
};
