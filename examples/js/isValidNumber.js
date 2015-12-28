var telInput = $("#phone"),
  errorMsg = $("#error-msg"),
  validMsg = $("#valid-msg");

function validate(){
  //display validation 
  if ($.trim(telInput.val())) {
    if (telInput.intlTelInput("isValidNumber")) {
      telInput.removeClass("error");
      errorMsg.addClass("hide");
      validMsg.removeClass("hide");
    } else {
      telInput.addClass("error");
      errorMsg.removeClass("hide");
      validMsg.addClass("hide");
    }
  }
}

// initialise plugin
telInput.intlTelInput({
  utilsScript: "../../lib/libphonenumber/build/utils.js"
});

// on blur: validate
telInput.blur(function() {
  validate();
});

// on keyup: validate
telInput.keyup(function() {
  validate();
});

