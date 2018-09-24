  var pluginName = "intlTelInput";

	// A really lightweight plugin wrapper around the constructor,
	// preventing against multiple instantiations
	$.fn[pluginName] = function(options) {
    var args = arguments;

    // Is the first parameter an object (options), or was omitted, instantiate a new instance of the plugin.
    if (options === undefined || typeof options === "object") {
			return this.each(function() {
				if (!$.data(this, "plugin_" + pluginName)) {
          var iti = new Iti(this, options);
          iti._init();
          window.intlTelInputGlobals.instances[iti.id] = iti;
					$.data(this, "plugin_" + pluginName, iti);
				}
			});
    } else if (typeof options === "string" && options[0] !== "_") {
      // If the first parameter is a string and it doesn't start with an underscore treat this as a call to a public method.

      // Cache the method call to make it possible to return a value
      var returns;
      this.each(function() {
        var instance = $.data(this, "plugin_" + pluginName);

        // Tests that there's already a plugin-instance and checks that the requested public method exists
        if (instance instanceof Iti && typeof instance[options] === "function") {
          // Call the method of our plugin instance, and pass it the supplied arguments.
          returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }

        // Allow instances to be destroyed via the 'destroy' method
        if (options === "destroy") $.data(this, "plugin_" + pluginName, null);
      });

      // If the earlier cached method gives a value back return the value, otherwise return this to preserve chainability.
      return returns !== undefined ? returns : this;
    }
	};
}));
