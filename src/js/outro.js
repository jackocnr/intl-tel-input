    // convenience wrapper
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      var domElem = el.jquery ? el[0] : el;
      domElem.IntlTelInput_Instance = iti;
      window.intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
}));
