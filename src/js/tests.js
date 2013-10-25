describe("create input element", function() {

  var input, container, totalCountries = 221;

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = container = null;
  });



  describe("init vanilla plugin", function() {

    beforeEach(function() {
      input.intlTelInput();
      container = input.parent();
    });

    it("creates a container with the right classes", function() {
      expect(container).toHaveClass("intl-tel-input pretty");
    });

    it("has the right number of list items", function() {
      var listElements = container.find(".country-list li.country");
      var defaultPreferredCountries = 2;
      expect(listElements.length).toEqual(totalCountries + defaultPreferredCountries);
    });

    it("defaults to the right flag", function() {
      var selectedFlag = container.find(".selected-flag .flag");
      expect(selectedFlag).toHaveClass("us");
    });

    it("defaults to the right dial code", function() {
      expect(input.val().trim()).toEqual("+1");
    });

    it("calling selectCountry updates the selected flag", function() {
      var countryCode = "gb";
      input.intlTelInput("selectCountry", countryCode);
      var selectedFlagElement = container.find(".selected-flag .flag");
      expect(selectedFlagElement).toHaveClass(countryCode);
    });

    it("typing a different dial code updates the selected flag", function() {
      input.val("+44").keyup();
      var selectedFlagElement = container.find(".selected-flag .flag");
      expect(selectedFlagElement).toHaveClass("gb");
    });

  });



  describe("init plugin with empty preferredCountries", function() {

    beforeEach(function() {
      input.intlTelInput({
        preferredCountries: []
      });
      container = input.parent();
    });

    it("defaults to the first country in the alphabet", function() {
      var selectedFlagElement = container.find(".selected-flag .flag");
      expect(selectedFlagElement).toHaveClass("af");
    });

    it("has the right number of list items", function() {
      var listElements = container.find(".country-list li.country");
      expect(listElements.length).toEqual(totalCountries);
    });

  });



  describe("init plugin with preferredCountries", function() {

    var preferredCountries;

    beforeEach(function() {
      // united kingdom
      preferredCountries = ['gb'];
      input.intlTelInput({
        preferredCountries: preferredCountries
      });
      container = input.parent();
    });

    afterEach(function() {
      preferredCountries = null;
    });

    it("defaults to the first preferredCountries", function() {
      var selectedFlagElement = container.find(".selected-flag .flag");
      expect(selectedFlagElement).toHaveClass(preferredCountries[0]);
    });

    it("has the right number of list items", function() {
      var listElements = container.find(".country-list li.country");
      expect(listElements.length).toEqual(totalCountries + preferredCountries.length);
    });

  });



  describe("init plugin with onlyCountries", function() {

    var onlyCountries;

    beforeEach(function() {
      // china and japan (these are NOT in the default preferredCountries)
      onlyCountries = ['ch', 'jp'];
      input.intlTelInput({
        onlyCountries: onlyCountries
      });
      container = input.parent();
    });

    afterEach(function() {
      onlyCountries = null;
    });

    it("has the right number of list items", function() {
      var listElements = container.find(".country-list li.country");
      expect(listElements.length).toEqual(onlyCountries.length);
    });

  });

});