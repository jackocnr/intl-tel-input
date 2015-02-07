var input = $("#phone"),
  output = $("#output");

input.intlTelInput({
  nationalMode: true,
  utilsScript: "../../lib/libphonenumber/build/utils.js" // just for formatting/placeholders etc
});

// listen to "keyup", but also "change" to update when the user selects a country
input.on("keyup change", function() {
  var intlNumber = input.intlTelInput("getNumber");
  if (intlNumber) {
    output.text("International: " + intlNumber);
  } else {
    output.text("Please enter a number below");
  }
});