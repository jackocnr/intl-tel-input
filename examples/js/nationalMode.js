var input = $("#phone"),
  output = $("#output");

input.intlTelInput({
  nationalMode: true,
  utilsScript: "../../lib/libphonenumber/build/utils.js" // just for formatting/placeholders etc
});

input.keyup(function() {
  var intlNumber = input.intlTelInput("getCleanNumber");
  if (intlNumber) {
    output.text("International: " + intlNumber);
  } else {
    output.text("Please enter a number below");
  }
});