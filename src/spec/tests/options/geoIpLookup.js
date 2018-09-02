"use strict";

describe("geoIpLookup:", function() {
  var deferred,
    country = "gb";

  beforeEach(function() {
    intlSetup();
    // must be in DOM for geoIpLookup callback to work - it looks for $(".intl-tel-input input")
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    intlTeardown();
    input.intlTelInput("destroy").remove();
    input = deferred = null;
  });

  it("init vanilla plugin resolves straight away", function() {
    deferred = input.intlTelInput();
    expect(deferred.state()).toEqual("resolved");
  });

  describe("init plugin with geoIpLookup", function() {
    beforeEach(function() {
      deferred = input.intlTelInput({
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          callback(country);
        },
      });
    });

    it("does not resolve straight away", function() {
      expect(deferred.state()).toEqual("pending");
    });
  });

  describe('init plugin with geoIpLookup, and wait for it to finish', function() {
    beforeEach(function(done) {
      deferred = input.intlTelInput({
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          callback(country);
        },
      });
      setTimeout(done);
    });

    it("does resolve", function() {
      expect(deferred.state()).toEqual("resolved");
    });

    describe('init a second instance with geoIpLookup', function() {
      var deferred2;

      beforeEach(function() {
        deferred2 = input.intlTelInput({
          initialCountry: "auto",
          geoIpLookup: function(callback) {
            callback(country);
          },
        });
      });

      afterEach(function() {
        deferred2 = null;
      });

      it("does resolve straight away", function() {
        expect($.fn.intlTelInput.autoCountry).toEqual(country);
        expect(deferred2.state()).toEqual("resolved");
      });
    });
  });
});
