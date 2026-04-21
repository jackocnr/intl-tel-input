# Utils script

The utils script (src/js/utils.js) is a custom build of Google's [libphonenumber](https://github.com/google/libphonenumber) which enables the following features:

* Formatting upon initialisation, as well as with [`getNumber`](/docs/methods#getnumber) and [`setNumber`](/docs/methods#setnumber)
* Validation with [`isValidNumber`](/docs/methods#isvalidnumber), [`getNumberType`](/docs/methods#getnumbertype) and [`getValidationError`](/docs/methods#getvalidationerror) methods
* Placeholder set to an example number for the selected country - even specify the type of number (e.g. mobile) using the [`placeholderNumberType`](/docs/options#placeholdernumbertype) option
* Extract the standardised (E.164) international number with [`getNumber`](/docs/methods#getnumber) even when using the [`nationalMode`](/docs/options#nationalmode) option

International number formatting/validation is hard (it varies by country/district, and we currently support ~230 countries). The only comprehensive solution we have found is libphonenumber, from which we have precompiled the relevant parts into a single JavaScript file, included in the build directory. Unfortunately, even after modification, it is still ~260KB. See the section below on the best way to load it.

## Loading the utils script

The utils script adds ~260KB on top of the ~30KB main plugin. There are two ways to load it — **if you're not sure which to pick, use Option 1.** It keeps your initial page load small, which is the safer default for most sites.

**Option 1: Lazy load utils on demand (recommended)**  
Import the regular `intlTelInput` and fetch the utils separately, using the [`loadUtils`](/docs/options#loadutils) option. The main plugin loads immediately (~30KB); the ~260KB utils file is fetched in the background after initialisation, so formatting/validation kicks in shortly after the input appears without blocking your initial page load.

```js
import intlTelInput from "intl-tel-input";

intlTelInput(input, {
  loadUtils: () => import("intl-tel-input/utils"),
});
```

_Note: this example uses ESM imports. If you're not using a bundler, see the [JavaScript plugin](/docs/javascript-plugin) page for examples of other approaches._

**Option 2: Use the all-in-one bundle**  
Import `intlTelInputWithUtils` instead of `intlTelInput`. It's the same plugin with utils bundled in, so everything works out of the box — no extra configuration. Best if you're already lazy loading the main plugin script, or if the extra ~260KB up front isn't a concern.

```js
import intlTelInput from "intl-tel-input/intlTelInputWithUtils";

intlTelInput(input, {
  // init options - no need for loadUtils here any more
});
```

You can also load it directly onto the page via a `<script>` tag — it defines `window.intlTelInput` just like the main script.

