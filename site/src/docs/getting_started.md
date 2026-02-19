# Getting Started

## Components

For the component docs, click one of the following links:
- [React component docs](https://github.com/jackocnr/intl-tel-input/blob/master/react/README.md) 
- [Vue component docs](https://github.com/jackocnr/intl-tel-input/blob/master/vue/README.md)
- [Angular component docs](https://github.com/jackocnr/intl-tel-input/blob/master/angular/README.md)
- [Svelte component docs](https://github.com/jackocnr/intl-tel-input/blob/master/svelte/README.md)

## JavaScript Plugin

For the JavaScript plugin, you can choose from one of the three Getting Started options below
- [Using a CDN](#using-a-cdn)
- [Using a bundler, e.g. Vite](#using-a-bundler-e-g-vite)
- [Not using a bundler](#not-using-a-bundler)

### Using a CDN

1. Add the CSS
  ```html
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@26.5.0/build/css/intlTelInput.css">
  ```

2. Add the plugin script and initialise it on your input element
  ```html
  <script src="https://cdn.jsdelivr.net/npm/intl-tel-input@26.5.0/build/js/intlTelInput.min.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://cdn.jsdelivr.net/npm/intl-tel-input@26.5.0/build/js/utils.js"),
    });
  </script>
  ```

### Using a bundler, e.g. Vite

1. Install with npm: `npm install intl-tel-input --save` or yarn: `yarn add intl-tel-input`

2. Import the CSS: `import 'intl-tel-input/build/css/intlTelInput.css';`

3. Set the path to flags.webp in your CSS, by overriding the CSS variables
  ```css
  .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
  }
  ```

4. Import the JS and initialise the plugin on your input element
  ```js
  import intlTelInput from 'intl-tel-input';

  const input = document.querySelector("#phone");
  intlTelInput(input, {
    loadUtils: () => import("intl-tel-input/utils"),
  });
  ```

Most bundlers (such as Vite, Turbopack or Parcel) will see this and place the [utilities script](/docs/utils) in a separate bundle and load it asynchronously, only when needed. If this doesn’t work with your bundler or you want to load the utils module from some other location (such as a CDN or your own hosted version), you can do that as well - see other examples.

### Not using a bundler

1. Download the [latest release](https://github.com/jackocnr/intl-tel-input/releases/latest), or better yet install it with [npm](https://www.npmjs.com/package/intl-tel-input)

2. Add the stylesheet
  ```html
  <link rel="stylesheet" href="path/to/intlTelInput.css">
  ```

3. Set the path to flags.webp in your CSS, by overriding the CSS variables
  ```css
  .iti {
    --iti-path-flags-1x: url('path/to/flags.webp');
    --iti-path-flags-2x: url('path/to/flags@2x.webp');
  }
  ```

4. Add the plugin script and initialise it on your input element
  ```html
  <script src="path/to/intlTelInput.js"></script>
  <script>
    const input = document.querySelector("#phone");
    window.intlTelInput(input, {
      loadUtils: () => import("https://my-domain/path/to/utils.js"),
    });
  </script>
  ```

## Recommended Usage

We highly recommend you [load the included utils.js](/docs/utils#loading-the-utilities-script), which enables formatting and validation, etc. Then the plugin is built to always deal with numbers in the full international format (e.g. "+17024181234") and convert them accordingly - even when [`nationalMode`](/docs/options#nationalmode) or [`separateDialCode`](/docs/options#separatedialcode) is enabled. We recommend you get, store, and set numbers exclusively in this format for simplicity - then you don't have to deal with handling the country code separately, as full international numbers include the country code information*.

You can always get the full international number (including country code) using [`getNumber`](/docs/methods#getnumber), then you only have to store that one string in your database (you don't have to store the country separately), and then the next time you initialise the plugin with that number in the input, it will automatically set the country* and format it according to the options you specify (e.g. when using [`nationalMode`](/docs/options#nationalmode) it will automatically display the number in national format, removing the international dial code).

If you know the user's country, you can set it with [`initialCountry`](/docs/options#initialcountry) (e.g. `"us"` for the United States). If you don't, we recommend setting [`initialCountry`](/docs/options#initialcountry) to `"auto"` (along with the [`geoIpLookup`](/docs/options#geoiplookup) option) to determine the user's country based on their IP address - [see example](/examples/lookup-country).

If you know the user's language, there is a built in way to translate the country names and user interface strings - [see example](/examples/internationalisation).

_*Except for some small satellite territories, which share number ranges with the main country (search data.ts for "shared" for examples). When displaying numbers from those shared ranges, we default to selecting the main country._
