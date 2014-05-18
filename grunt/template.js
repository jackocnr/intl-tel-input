module.exports = function(grunt) {

  // timestamp in asset URLs for cache busting
  var time = (new Date()).getTime();

  return {
    js: {
      src: 'src/js/wrapper.js.ejs',
      dest: 'tmp/all.js',
      variables: function() {
        return {
          plugin: grunt.file.read('src/js/intlTelInput.js'),
          data: grunt.file.read('src/js/data.js'),
        }
      }
    },
    defaultCountryIp: {
      src: 'examples/template.html.ejs',
      dest: 'examples/gen/default-country-ip.html',
      variables: function() {
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
      variables: function() {
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
      variables: function() {
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
      variables: function() {
        return {
          time: time,
          title: "Styling",
          desc: "The two different settings for the defaultStyling option: 'inside' (default) and 'outside'.",
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
      variables: function() {
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
      variables: function() {
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
  };
};