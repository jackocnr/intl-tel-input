var input = $("#phone");

input.intlTelInput({
  utilsScript: "../../lib/libphonenumber/build/utils.js" // just for formatting/placeholders etc
});

input.on("invalidkey", function() {
  input.addClass("flash");
  setTimeout(function() {
    input.removeClass("flash");
  }, 100);
});