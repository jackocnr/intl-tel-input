describe("create input element", function() {

  var input, defaultPreferredCountries = 2;

  beforeEach(function() {
    input = $("<input>");
  });

  afterEach(function() {
    input = null;
  });



  describe("init vanilla plugin", function() {

    beforeEach(function() {
      input.intlTelInput();
    });

    it("creates a parent with the right class", function() {
      expect(input.parent()).toHaveClass("intl-tel-input");
    });

    it("has the right number of list items", function() {
      var listElements = input.siblings(".flag-dropdown").find("li.country");
      expect(listElements.length).toEqual(intlData.countries.length + defaultPreferredCountries);
    });

    it("calling selectCountry updates the selected flag", function() {
      var countryCode = "gb";
      input.intlTelInput("selectCountry", countryCode);
      var selectedFlagElement = input.siblings(".flag-dropdown").find(".flag");
      expect(selectedFlagElement).toHaveClass(countryCode);
    });

  });



  describe("init plugin with empty preferredCountries", function() {

    beforeEach(function() {
      input.intlTelInput({
        preferredCountries: []
      });
    });

    it("defaults to the first country in the alphabet", function() {
      var selectedFlagElement = input.siblings(".flag-dropdown").find(".flag");
      var firstCountry = intlData.countries[0];
      expect(selectedFlagElement).toHaveClass(firstCountry.cca2);
    });

    it("has the right number of list items", function() {
      var listElements = input.siblings(".flag-dropdown").find("li.country");
      expect(listElements.length).toEqual(intlData.countries.length);
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
    });

    afterEach(function() {
      preferredCountries = null;
    });

    it("defaults to the first preferredCountries", function() {
      var selectedFlagElement = input.siblings(".flag-dropdown").find(".flag");
      expect(selectedFlagElement).toHaveClass(preferredCountries[0]);
    });

    it("has the right number of list items", function() {
      var listElements = input.siblings(".flag-dropdown").find("li.country");
      expect(listElements.length).toEqual(intlData.countries.length + preferredCountries.length);
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
    });

    afterEach(function() {
      onlyCountries = null;
    });

    it("has the right number of list items", function() {
      var listElements = input.siblings(".flag-dropdown").find("li.country");
      expect(listElements.length).toEqual(onlyCountries.length);
    });

  });

});