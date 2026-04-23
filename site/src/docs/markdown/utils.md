# Utils script

The utils script (src/js/utils.js) is a custom build of Google's [libphonenumber](https://github.com/google/libphonenumber) which enables the following features:

* Formatting upon initialisation, as well as with [`getNumber`](/docs/methods#getnumber) and [`setNumber`](/docs/methods#setnumber)
* Validating with [`isValidNumber`](/docs/methods#isvalidnumber), [`getNumberType`](/docs/methods#getnumbertype) and [`getValidationError`](/docs/methods#getvalidationerror) methods
* Generating placeholder numbers for every country - even specify the type of number (e.g. mobile) using the [`placeholderNumberType`](/docs/options#placeholdernumbertype) option
* Extracting the standardised (E.164) international number with [`getNumber`](/docs/methods#getnumber) even when using the [`nationalMode`](/docs/options#nationalmode) option

International number formatting/validation is hard (it varies by country/district, and we currently support ~230 countries). The only comprehensive solution we have found is libphonenumber, from which we have precompiled the relevant parts into a single JavaScript file, included in the build directory. Unfortunately, even after modification, it is still ~260KB. See the section below on the best way to load it.

## Loading the utils script

The utils script adds ~260KB on top of the ~30KB main plugin. There are two ways to load it — **if you're not sure which to pick, use Option 1.** It keeps your initial page load small, which is the safer default for most sites.

**Option 1: Lazy load utils on demand (recommended)**  
Use the [`loadUtils`](/docs/options#loadutils) option to fetch the utils separately. The main plugin/component loads quickly (~30KB); the ~260KB utils file is fetched in the background after initialisation, so formatting/validation kicks in shortly after the input appears without blocking your initial page load.

**Option 2: Use the all-in-one bundle**  
Each distribution ships a companion entry point that bundles utils directly — `intl-tel-input/intlTelInputWithUtils` for the JS plugin, `intl-tel-input/reactWithUtils` for React, `intl-tel-input/vueWithUtils` for Vue, and so on. Everything works out of the box, with no extra configuration. Best if you're already lazy loading the main script, or if the extra ~260KB up front isn't a concern.

For exact code, see the quick-start on the relevant docs page: [JavaScript plugin](/docs/javascript-plugin), [React](/docs/react-component), [Vue](/docs/vue-component), [Angular](/docs/angular-component), or [Svelte](/docs/svelte-component).

