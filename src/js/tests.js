describe("initialising the plugin", function() {

  var input;

  beforeEach(function() {
    input = $("<input>");
    input.intlTelInput();
  });

  afterEach(function() {
    input = null;
  });

  it("creates a parent with the right class", function() {
    expect(input.parent()).toHaveClass("intl-tel-input");
  });

});