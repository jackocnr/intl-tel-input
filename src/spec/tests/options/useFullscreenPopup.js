"use strict";

describe("useFullscreenPopup: testing fullscreen behavior can be controlled", function() {
  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
    $('body').removeClass('iti-fullscreen-popup')
  });

  it("can enable fullscreen popup", function(){
    iti = window.intlTelInput(input[0], {
      useFullscreenPopup: true,
    });

    expect($('body')).toHaveClass('iti-fullscreen-popup')
  })

  it("can disable fullscreen popup", function(){
    iti = window.intlTelInput(input[0], {
      useFullscreenPopup: false,
    });

    expect($('body')).not.toHaveClass('iti-fullscreen-popup')
  })


  it("can use default behavior: desktop", function(){
    iti = window.intlTelInput(input[0]);

    expect($('body')).not.toHaveClass('iti-fullscreen-popup')
  })

  // we would need to set the viewport width < 500 for this test to pass
  it.skip("can use default behavior: mobile", function(){
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('iPhone');

    iti = window.intlTelInput(input[0]);

    expect($('body')).toHaveClass('iti-fullscreen-popup')
  })
});
