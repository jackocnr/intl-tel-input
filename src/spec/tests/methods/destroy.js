"use strict";

describe("destroy: init plugin to test public method destroy", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0]);
  });

  afterEach(function() {
    intlTeardown();
  });

  it("adds the markup", function() {
    expect(getParentElement()).toHaveClass("iti");
    expect(getSelectedCountryContainer()).toExist();
    expect(getListElement()).toExist();
  });

  //* This is currently impossible in pure JS, until getEventListeners becomes standard.
  // it("binds the event listeners", function() {
  //   var listeners = getEventListeners(input[0]);
  //   expect("cut" in listeners).toBeTruthy();
  //   expect("paste" in listeners).toBeTruthy();
  //   expect("keyup" in listeners).toBeTruthy();
  // });


  describe("calling destroy", function() {

    beforeEach(function() {
      iti.destroy();
    });

    it("removes the markup", function() {
      expect(getParentElement()).not.toHaveClass("iti");
      expect(getSelectedCountryContainer()).not.toExist();
      expect(getListElement()).not.toExist();
    });

    //* This is currently impossible in pure JS, until getEventListeners becomes standard.
    // it("unbinds the event listeners", function() {
    //   var listeners = getEventListeners(input[0]);
    //   expect(listeners).toBeUndefined();
    // });

  });

});




describe("destroy: init plugin with nationalMode=false", function() {

  beforeEach(function() {
    intlSetup();
    input = $("<input>").wrap("div");
    iti = window.intlTelInput(input[0], {
      nationalMode: false,
    });
  });

  afterEach(function() {
    intlTeardown();
  });

  //* This is currently impossible in pure JS, until getEventListeners becomes standard.
  // it("binds the events listeners", function() {
  //   var listeners = getEventListeners(input[0]);
  //   expect("blur" in listeners).toBeTruthy();
  //   expect("focus" in listeners).toBeTruthy();
  //   expect("mousedown" in listeners).toBeTruthy();
  // });


  describe("calling destroy", function() {

    beforeEach(function() {
      input.intlTelInput("destroy");
    });

    //* this is currently impossible in pure JS, until getEventListeners becomes standard.
    // it("unbinds the event listeners", function() {
    //   var listeners = getEventListeners(input[0]);
    //   expect(listeners).toBeUndefined();
    // });

  });

});
