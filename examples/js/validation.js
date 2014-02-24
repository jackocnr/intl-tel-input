var telInput = $("#phone");

// initialise plugin
telInput.intlTelInput({
  validationScript: "../../lib/libphonenumber/build/isValidNumber.js"
});

// on blur: check for errors
telInput.blur(function() {
  if ($.trim(telInput.val()) && !telInput.intlTelInput("isValidNumber")) {
    $(this).addClass("error");
  }
});

// on keyup: remove any error
telInput.keyup(function() {
  $(this).removeClass("error");
});