    // convenience wrapper
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      input.setAttribute('data-intl-tel-input-id', iti.id);
      window.intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
}));
