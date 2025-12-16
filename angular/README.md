# IntlTelInput Angular Component

An Angular component wrapper for the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/angular/src/intl-tel-input/angular.ts).

## Table of Contents

- [Demo](#demo)
- [Getting Started](#getting-started)
- [Props](#props)
- [Events](#events)
- [Accessing Instance Methods](#accessing-instance-methods)
- [Accessing Static Methods](#accessing-static-methods)

## Demo

Try it yourself by running the demos locally:

```bash
# Clone the repository
git clone https://github.com/jackocnr/intl-tel-input.git
cd intl-tel-input

# Initialize submodules (required for build)
git submodule update --init --recursive

# Install dependencies and build
npm install
npm run build

# Serve from project root
python3 -m http.server
```

> Then open [http://localhost:8000/angular/demo/simple/](http://localhost:8000/angular/demo/simple/) or other demos from the [angular demo folder](https://github.com/jackocnr/intl-tel-input/blob/master/angular/demo/)

> [!NOTE]
> Make sure to serve from the project root, not from the demo folders.

## Getting Started

```html
import { IntlTelInputComponent } from "intl-tel-input/angularWithUtils";
import "intl-tel-input/styles";

<intl-tel-input
  #telInput
  (numberChange)="handleNumberChange($event)"
  (validityChange)="handleValidityChange($event)"
  [initOptions]="{
    initialCountry: 'us',
  }"
/>
```

See the [validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/angular/demo/validation/validation.component.ts) for a more fleshed-out example of how to handle validation, or check out the [form demo](https://github.com/jackocnr/intl-tel-input/blob/master/angular/demo/form/form.component.ts) for an alternative approach using `ReactiveFormsModule`.

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize) then you can just `import { IntlTelInputComponent } from "intl-tel-input/angularWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/angular"` import, then you should couple this with the `loadUtils` initialisation option - you will need to host the [utils.js](https://github.com/jackocnr/intl-tel-input/blob/master/build/js/utils.js) file, and then set the `loadUtils` option to that URL, or alternatively just point it to a CDN hosted version e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@25.13.2/build/js/utils.js"`.

## Props

Here's a list of all of the current props you can pass to the IntlTelInput Angular component.

**disabled**\
Type: `Boolean`, Default: `false`\
Sets the disabled attribute of both the telephone input and selected country button. _Note: we recommend using this instead of `inputProps.disabled`._

**initialValue**\
Type: `String`\
The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). IntlTelInput is an uncontrolled input, and so will ignore any changes to this value.

**initOptions**\
Type: `Object`\
An object containing the [initialisation options](https://github.com/jackocnr/intl-tel-input?tab=readme-ov-file#initialisation-options) to pass to the plugin. You can use these exactly the same way as with the main JavaScript plugin.

**inputProps**\
Type: `Object`\
The props to pass to the input element e.g. `class`, `placeholder`, `required` etc. _Note: we recommend using the separate `disabled` prop instead of `inputProps.disabled`._

**usePreciseValidation**\
Type: `Boolean`, Default: `false`\
By default we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise` you can set this to `true`.

## Events

Here's a list of all of the current events you can listen to on the IntlTelInput angular component.

**countryChange**\
Type: `Function`\
A handler to be called when the selected country changes. It will be passed the new country iso2 code e.g. "gb" for UK.

**errorCodeChange**\
Type: `Function`\
A handler to be called when the number validation error changes. It will be passed the new error code (or `null`).

**numberChange**\
Type: `Function`\
A handler to be called when the number changes. It will be passed the new number.

**validityChange**\
Type: `Function`\
A handler to be called when the number validity changes e.g. to true/false. It will be passed the new isValid boolean.

### Native Input Events

The component exposes several commonly used native DOM events that you can bind to using Angular's standard event binding syntax `(eventName)="handlerMethod($event)"`. For other native events not listed below, you can access the input element directly (see [Other Native Events](#other-native-events) section).

#### Supported Events

The following native input events are directly supported:
- `blur` - Fired when the input loses focus (receives `FocusEvent`)
- `focus` - Fired when the input receives focus (receives `FocusEvent`)
- `keydown` - Fired when a key is pressed down (receives `KeyboardEvent`)
- `keyup` - Fired when a key is released (receives `KeyboardEvent`)
- `paste` - Fired when content is pasted (receives `ClipboardEvent`)
- `click` - Fired when the input is clicked (receives `MouseEvent`)

Example usage:
```html
<intl-tel-input
  (blur)="handleBlur($event)"
  (focus)="handleFocus($event)"
  (keydown)="handleKeyDown($event)"
  (paste)="handlePaste($event)"
/>
```

#### Other Native Events

For any other native DOM events not listed above, you can access the input element directly using a `ViewChild` reference and add event listeners manually:

```typescript
export class MyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('telInput') telInput!: IntlTelInputComponent;

  ngAfterViewInit() {
    const input = this.telInput.getInput();
    input?.addEventListener('mouseenter', this.handleMouseEnter);
  }

  ngOnDestroy() {
    const input = this.telInput.getInput();
    input?.removeEventListener('mouseenter', this.handleMouseEnter);
  }

  handleMouseEnter = (event: MouseEvent) => {
    console.log('Mouse entered input:', event);
  }
}
```

## Accessing Instance Methods

You can access all of the plugin's [instance methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType` etc) by using a ViewChild reference into the IntlTelInput component (using the `#ref` prop), and then calling `this.ref.getInstance()` e.g. `this.ref.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/angular/demo/set-number/set-number.component.ts) for a full example. You can also access the input DOM element in a similar way: `this.ref.getInput()`.

> [!IMPORTANT]
> You must use `ngAfterViewInit` (not `ngOnInit` or `constructor`) to access instance or input methods, as the component needs to be fully initialized first.

## Accessing Static Methods

You can access all of the plugin's [static methods](https://github.com/jackocnr/intl-tel-input/blob/master/README.md#static-methods) by importing `intlTelInput` from the same file as the angular component e.g. `import { intlTelInput } from "intl-tel-input/angular"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.
