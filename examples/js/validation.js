var telInput = $("#phone");

// initialise plugin
telInput.intlTelInput();

// on change: check for errors
telInput.change(function() {
  if (isValidIntlNumber($(this).val())) {
    $(this).removeClass("error");
  } else {
    $(this).addClass("error");
  }
});

// on keyup remove any error
telInput.keyup(function() {
  $(this).removeClass("error");
});