    // convenience wrapper
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      var domElem = input.jquery ? input[0] : input;
      domElem.IntlTelInput_Instance = iti;
      window.intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
}));
