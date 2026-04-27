# IntlTelInput Svelte Component

A Svelte 5 component for the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/packages/svelte/src/IntlTelInput.svelte).

[Explore docs »](https://intl-tel-input.com/docs/svelte-component)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/iti-github-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/iti-github-light.png">
  <img width="271" height="279" alt="Plugin screenshot showing country dropdown open" src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/iti-github-light.png">
</picture>

## Running the demos locally

1. Initialise the submodules: `git submodule update --init --recursive`
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Run a demo: `npm run svelte:demo` and copy the given URL into your browser.

This defaults to the validation demo — to run a different one, set the `DEMO` env var, e.g. `DEMO=simple npm run svelte:demo`. View the full list of [available demos](https://github.com/jackocnr/intl-tel-input/tree/master/packages/svelte/demo).
