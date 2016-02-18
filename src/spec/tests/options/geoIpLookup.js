"use strict";

describe("geoIpLookup:", function() {

  var deferred;

  beforeEach(function() {
    intlSetup();
    // must be in DOM for geoIpLookup callback to work - it looks for $(".intl-tel-input input")
    input = $("<input>").appendTo("body");
  });

  afterEach(function() {
    input.intlTelInput("destroy").remove();
    input = deferred = null;
  });

  it("init vanilla plugin resolves straight away", function() {
    deferred = input.intlTelInput();
    expect(deferred.state()).toEqual("resolved");
  });

  describe("init plugin with geoIpLookup", function() {

    var country = "gb";

    beforeEach(function() {
      jasmine.clock().install();
      deferred = input.intlTelInput({
        initialCountry: "auto",
        geoIpLookup: function(callback) {
          setTimeout(function() {
            callback(country);
          }, 1000);
        }
      });
    });

    afterEach(function() {
      jasmine.clock().uninstall();
    });

    it("does not resolve straight away, but then fast forward and it does resolve", function() {
      expect(deferred.state()).toEqual("pending");
      jasmine.clock().tick(1001);
      expect(deferred.state()).toEqual("resolved");
    });

    it("future instances resolve straight away", function() {
      expect($.fn.intlTelInput.autoCountry).toEqual(country);
      expect(deferred.state()).toEqual("resolved");
    });

  });

});
