    // convenience wrapper
    return function(input, options) {
      var iti = new Iti(input, options);
      iti._init();
      window.intlTelInputGlobals.instances[iti.id] = iti;
      return iti;
    };
  })();
}));
