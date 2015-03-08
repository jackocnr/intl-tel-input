var input = $("#phone"),
  output = $("#output"),
  form = $('form');

input.intlTelInput({
  nationalMode: true,
  submitCountryCode: true,
  submitCountryCodeName: 'country_code'
});

// listen to "keyup", but also "change" to update when the user selects a country
input.on("keyup change", function() {
  output.text(JSON.stringify(form.serializeArray()));
});

// initial payload on output
output.text(JSON.stringify(form.serializeArray()));