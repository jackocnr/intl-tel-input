# Angular component for intl-tel-input

For entering, formatting, and validating international telephone numbers.

[Explore docs »](https://intl-tel-input.com/docs/angular-component)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/iti-github-dark.png">
  <source media="(prefers-color-scheme: light)" srcset="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/iti-github-light.png">
  <img width="271" height="279" alt="intl-tel-input screenshot showing country dropdown open" src="https://raw.github.com/jackocnr/intl-tel-input/master/screenshots/iti-github-light.png">
</picture>

## Compatibility

`@intl-tel-input/angular` v29 is compiled with Angular 21 and requires **Angular 21 or newer** (`@angular/core`, `@angular/common`, and `@angular/forms`).

Installing it in Angular 17–20 fails at runtime (`TypeError: (void 0) is not a function` in the compiled template) because the published bundle uses compiler instructions such as `ɵɵdomElementStart` that those versions do not provide.

Angular 17 apps should stay on `@intl-tel-input/angular@26.9.2` until they upgrade Angular, or until this package is published with partial compilation so older runtimes can consume it.

## Resources

Check out the [website](https://intl-tel-input.com), where you can find [a full set of docs](https://intl-tel-input.com/docs/angular-component), a [live playground](https://intl-tel-input.com/playground/) where you can try out all of the options, as well as plenty of [examples](https://intl-tel-input.com/examples/angular-component/validation) of different setups.

## Running the demos locally

1. Initialise the submodules: `git submodule update --init --recursive`
2. Install dependencies: `npm install`
3. Build: `npm run build`

You can then open `packages/angular/demo/validation/index.html` in your browser to try the validation demo. View the full list of [available demos](https://github.com/jackocnr/intl-tel-input/tree/master/packages/angular/demo).

## Issues and contributing

Please report issues and open pull requests on the [main repository](https://github.com/jackocnr/intl-tel-input).

## License

MIT
