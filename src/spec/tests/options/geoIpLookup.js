"use strict";

describe("geoIpLookup:", function() {
  var country = "gb",
    resolved = false;

  beforeEach(function() {
    intlSetup();
    // must be in DOM for geoIpLookup callback to work - it looks for $(".intl-tel-input input")
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
    resolved = false;
  });

  describe("init vanilla plugin", function() {
    beforeEach(function(done) {
      iti = window.intlTelInput(input[0]);
      iti.promise.then(function() {
        resolved = true;
      });
      setTimeout(done);
    });

    it("does not resolve straight away", function() {
      expect(resolved).toEqual(true);
    });
  });

  describe("init plugin with geoIpLookup", function() {
    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          callback(country);
        },
      });
      iti.promise.then(function() {
        resolved = true;
      });
    });

    it("does not resolve straight away", function() {
      expect(resolved).toEqual(false);
    });
  });

  describe('init plugin with geoIpLookup, and wait for it to finish', function() {
    beforeEach(function(done) {
      iti = window.intlTelInput(input[0], {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          callback(country);
        },
      });
      iti.promise.then(function() {
        resolved = true;
        done();
      });
    });

    it("does resolve", function() {
      expect(resolved).toEqual(true);
    });

    describe('init a second instance with geoIpLookup', function() {
      var input2,
        iti2,
        resolved2 = false;

      beforeEach(function(done) {
        input2 = $("<input>").appendTo("body");
        iti2 = window.intlTelInput(input2[0], {
          initialCountry: "auto",
          geoIpLookup: function(callback) {
            callback(country);
          },
        });
        iti2.promise.then(function() {
          resolved2 = true;
        });
        setTimeout(done);
      });

      afterEach(function() {
        iti2.destroy();
        input2.remove();
        input2 = iti2 = null;
        resolved2 = false
      });

      it("does resolve straight away", function() {
        expect(window.intlTelInputGlobals.autoCountry).toEqual(country);
        expect(resolved2).toEqual(true);
      });
    });
  });
});
