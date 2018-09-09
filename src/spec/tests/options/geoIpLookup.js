"use strict";

describe("geoIpLookup:", function() {
  var country = "gb";

  beforeEach(function() {
    intlSetup();
    // must be in DOM for geoIpLookup callback to work - it looks for $(".intl-tel-input input")
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
  });

  it("init vanilla plugin resolves straight away", function() {
    iti = window.intlTelInput(input[0]);
    expect(iti.deferred.state()).toEqual("resolved");
  });

  describe("init plugin with geoIpLookup", function() {
    beforeEach(function() {
      iti = window.intlTelInput(input[0], {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          callback(country);
        },
      });
    });

    it("does not resolve straight away", function() {
      expect(iti.deferred.state()).toEqual("pending");
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
      setTimeout(done);
    });

    it("does resolve", function() {
      expect(iti.deferred.state()).toEqual("resolved");
    });

    describe('init a second instance with geoIpLookup', function() {
      var input2,
        iti2;

      beforeEach(function() {
        input2 = $("<input>").appendTo("body");
        iti2 = window.intlTelInput(input2[0], {
          initialCountry: "auto",
          geoIpLookup: function(callback) {
            callback(country);
          },
        });
      });

      afterEach(function() {
        iti2.destroy();
        input2.remove();
        input2 = iti2 = null;
      });

      it("does resolve straight away", function() {
        expect(window.intlTelInputGlobals.autoCountry).toEqual(country);
        expect(iti2.deferred.state()).toEqual("resolved");
      });
    });
  });
});
