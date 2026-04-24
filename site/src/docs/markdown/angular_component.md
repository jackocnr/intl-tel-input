# Angular component

An Angular component for the intl-tel-input JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/angular/src/IntlTelInput.ts), see a live demo on the [Angular component](/examples/angular-component) example page, or follow the [README](https://github.com/jackocnr/intl-tel-input/blob/master/angular/README.md) to run the full set of demos locally.

## Contents

- [Installation](#installation)
- [Props](#props)
- [Plugin initialisation options](#plugin-initialisation-options)
- [Form integration](#form-integration-ngmodel-formcontrol)
- [Events](#events)
- [Accessing instance methods](#accessing-instance-methods)
- [Accessing static methods](#accessing-static-methods)

## Installation

First, install the package: 

```sh
npm install intl-tel-input
```

Then, add something like this to your code:

```ts
import IntlTelInput from "intl-tel-input/angular";
import "intl-tel-input/styles";

@Component({
  imports: [IntlTelInput],
  template: `<intl-tel-input initialCountry="us" [loadUtils]="loadUtils" />`,
})
export class PhoneInputComponent {
  loadUtils = () => import("intl-tel-input/utils");
}
```

> [!NOTE]
> The utils script (~260KB) is loaded separately. The example above passes a dynamic import to [`loadUtils`](/docs/options#loadutils) — modern bundlers split this into its own lazy-loaded chunk, so it doesn't hit your initial bundle. Alternatively, if `IntlTelInput` is already lazy-loaded in your app, import from `"intl-tel-input/angularWithUtils"` to bundle utils directly.

See [Best practices](/docs/best-practices) for general advice on validation, E.164 storage, initial country, and localisation.

## Props

Any of the plugin's [initialisation options](#plugin-initialisation-options) (like `initialCountry`) can also be passed as an input.

###### disabled
Type: `boolean`  
Default: `false`  

Sets the disabled attribute of both the telephone input and the selected country button. Use this instead of `inputAttributes.disabled`, as this disables the country button too.

###### initialValue
Type: `string`  
Default: `""`  

The initial value to put in the input. This will get auto-formatted on init (according to `formatOnDisplay` initialisation option). Only used during initialisation — for ongoing reactive updates, use `[(ngModel)]` or a reactive `formControl` instead.

###### inputAttributes
Type: `object`  
Default: `{}`  

The attributes to pass to the input element, e.g. `class`, `placeholder`, `required`, etc.

> [!NOTE]
> The following keys are reserved for the component/plugin integration and will be ignored: `type`, `value`, `disabled`, `readonly`. Use the component props (`initialValue`, `disabled`, `readonly`) and the output event bindings instead.

###### readonly
Type: `boolean`  
Default: `false`  

Sets the readonly attribute of the telephone input and disables the selected country button. Use this instead of `inputAttributes.readonly`, as this disables the country button too.

###### usePreciseValidation
Type: `boolean`  
Default: `false`  

By default, we use `isValidNumber` for validation, but if you'd rather use `isValidNumberPrecise`, you can set this to `true`.


## Plugin initialisation options

All of the plugin's [initialisation options](/docs/options) are supported as individual Angular component inputs using the same option name. For example:

```html
<intl-tel-input initialCountry="us" />
```

> [!NOTE]
> If you're migrating from an older version, the previous `[initOptions]="{ initialCountry: 'us' }"` style is no longer supported — pass each option as its own input instead.


## Form integration (ngModel / formControl)

The component implements `ControlValueAccessor`, so you can bind to it with Angular Forms (`[(ngModel)]`, `formControl`, or `formControlName`) for two-way reactive updates. Whenever the bound value changes, the input is updated via `setNumber`. See the [form demo](https://github.com/jackocnr/intl-tel-input/blob/master/angular/demo/form/form.component.ts) for an example using `ReactiveFormsModule`.


## Events

###### countryChange
Type: `EventEmitter<string>`  
Default: `null`  

Emitted when the selected country changes. Emits the new country's iso2 code (e.g. `"gb"`), or `""` if no country is selected.

###### errorCodeChange
Type: `EventEmitter<number | null>`  
Default: `null`  

Emitted when the number validation error changes. Emits an integer that matches the [`intlTelInput.utils.validationError`](/docs/methods#getvalidationerror) enum, or `null` if the number is valid. Requires the utils script to be loaded (see above).

###### numberChange
Type: `EventEmitter<string>`  
Default: `null`  

Emitted when the number changes. Emits the new number in standardised E.164 format (e.g. `"+447700900123"`), or `""` if the input is empty. Requires the utils script to be loaded (see above).

###### validityChange
Type: `EventEmitter<boolean>`  
Default: `null`  

Emitted when the number validity changes. Emits the new validity boolean. Requires the utils script to be loaded (see above).

###### closeCountryDropdown
Type: `EventEmitter<void>`  
Default: `null`  

Emitted when the country dropdown closes.

###### openCountryDropdown
Type: `EventEmitter<void>`  
Default: `null`  

Emitted when the country dropdown opens.

###### strictReject
Type: `EventEmitter<{ source: "key" | "paste", rejectedInput: string, reason: "invalid" | "max-length" }>`  
Default: `null`  

Emitted when [`strictMode`](/docs/options#strictmode) rejects or modifies input. The event payload has three fields describing what was rejected and why, so you can give the user appropriate feedback (e.g. a toast or a shake animation):

- `source`: either `"key"` (a keystroke) or `"paste"` (a clipboard paste).
- `rejectedInput`: the raw string that was rejected or stripped — for `"key"` this is the single character pressed, and for `"paste"` it's the full pasted text.
- `reason`: either `"invalid"` (the input contained a disallowed character) or `"max-length"` (accepting the input would have exceeded the maximum valid length for the selected country).

Here is an example that selects a user-facing message based on these fields:

```js
const { source, rejectedInput, reason } = $event;
if (reason === "max-length") msg = "Maximum length reached for this country";
else if (source === "paste") msg = "Stripped invalid characters from pasted text";
else msg = `Character not allowed: "${rejectedInput}"`;
```

**See also:** [`strictRejectAnimation`](/docs/options#strictrejectanimation) for a built-in shake/flash animation, if you don't need custom feedback logic.

### Native input events

The component exposes several commonly used native DOM events that you can bind to using Angular's standard event binding syntax `(eventName)="handlerMethod($event)"`. For other native events not listed below, you can access the input element directly (see [Other native events](#other-native-events) section).

#### Supported events

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

#### Other native events

For any other native DOM events not listed above, you can access the input element directly using a `ViewChild` reference and add event listeners manually:

```typescript
export class MyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('telInput') telInput!: IntlTelInput;

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

## Accessing instance methods

You can access all of the plugin's [instance methods](/docs/methods#instance-methods) (`setNumber`, `setCountry`, `setPlaceholderNumberType`, etc.) by using a ViewChild reference into the IntlTelInput component (using the `#ref` prop), and then calling `this.ref.getInstance()`, e.g. `this.ref.getInstance().setNumber(...);`. See the [Set Number demo](https://github.com/jackocnr/intl-tel-input/blob/master/angular/demo/set-number/set-number.component.ts) for a full example. You can also access the input DOM element in a similar way: `this.ref.getInput()`.

> [!IMPORTANT]
> You must use `ngAfterViewInit` (not `ngOnInit` or `constructor`) to access instance or input methods, as the component needs to be fully initialised first.

## Accessing static methods

You can access all of the plugin's [static methods](/docs/methods#static-methods) by importing `intlTelInput` from the same file as the Angular component, e.g. `import { intlTelInput } from "intl-tel-input/angular"` (note the lower case "i" in "intlTelInput"). You can then use this as you would with the main plugin, e.g. `intlTelInput.getCountryData()` or `intlTelInput.utils.numberType` etc.
