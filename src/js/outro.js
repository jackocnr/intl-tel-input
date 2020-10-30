    // convenience wrapper
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      input.setAttribute('data-intl-tel-input-id', iti.id);
      intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
}));
