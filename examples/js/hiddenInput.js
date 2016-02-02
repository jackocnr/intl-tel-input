$("#phone").intlTelInput({
  utilsScript: "../../build/js/utils.js" // just for formatting/placeholders etc
});

// update the hidden input on submit
$("form").submit(function() {
  $("#hidden").val($("#phone").intlTelInput("getNumber"));
});