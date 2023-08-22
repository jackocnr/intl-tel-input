"use strict";

describe("useFullscreenPopup: testing fullscreen behavior can be controlled", function() {
  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
  });

  afterEach(function() {
    intlTeardown();
    $('body').removeClass('iti-mobile')
  });

  it("can enable fullscreen popup", function(){
    iti = window.intlTelInput(input[0], {
        useFullscreenPopup(){
            return true;
        }
    });

    expect($('body')).toHaveClass('iti-mobile')
  })

  it("can disable fullscreen popup", function(){
    iti = window.intlTelInput(input[0], {
        useFullscreenPopup(){
            return false;
        }
    });

    expect($('body')).not.toHaveClass('iti-mobile')
  })


  it("can use default behavior: desktop", function(){
    iti = window.intlTelInput(input[0]);

    expect($('body')).not.toHaveClass('iti-mobile')
  })

  it("can use default behavior: mobile", function(){
    spyOnProperty(window.navigator, 'userAgent').and.returnValue('iPhone');

    iti = window.intlTelInput(input[0]);

    expect($('body')).toHaveClass('iti-mobile')
  })
});
