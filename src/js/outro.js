    // convenience wrapper
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      var domElem = input.jquery ? input[0] : input;
      var indexControl = document.querySelectorAll('.intl-tel-input').length;
      domElem.setAttribute('data-intl-tel-input-id', indexControl);
      window.intlTelInputGlobals.instances[indexControl] = iti;
      return iti;
    };
  })();
}));
