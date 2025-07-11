# International Telephone Input for React Native

A React Native component for entering and validating international telephone numbers. Built on top of the popular [intl-tel-input](https://github.com/jackocnr/intl-tel-input) library.

## Features

- 🌍 **244 countries** supported
- 📱 **Mobile-optimized** interface with native components
- 🎨 **Customizable styling** for all components
- 🔍 **Country search** functionality with real-time filtering
- 🏳️ **Flag emojis** for country representation
- ✅ **Phone number validation** (with optional utils)
- 📞 **Format as you type** (with utils)
- 🎯 **TypeScript** support with full type definitions
- 🔧 **Highly configurable** options
- 🌐 **Auto country detection** via geo IP lookup
- 📋 **Example number placeholders** (with utils)
- 🎨 **Separate dial code** display option
- 🔄 **Dynamic utils loading** support
- 📱 **Platform-specific optimizations** for iOS and Android

## Installation

```bash
npm install intl-tel-input
```

**Note:** This package has an optional peer dependency on `react-native >= 0.74.0`. Make sure you have React Native installed in your project.

## Quick Start

The React Native implementation provides maximum API compatibility with the main intl-tel-input library while using native React Native components for optimal performance and user experience.

## Basic Usage

```tsx
import React, { useState } from 'react';
import { View } from 'react-native';
import IntlTelInput from 'intl-tel-input/react-native';

const MyComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  return (
    <View>
      <IntlTelInput
        initialValue="+1234567890"
        onChangeNumber={setPhoneNumber}
        onChangeCountry={setCountry}
        onChangeValidity={setIsValid}
        onChangeErrorCode={setErrorCode}
        initOptions={{
          initialCountry: "us",
          formatAsYouType: true,
          autoPlaceholder: "polite",
        }}
        inputProps={{
          placeholder: "Enter phone number",
          maxLength: 15,
        }}
      />
    </View>
  );
};
```

## With Utils (Enhanced Validation & Formatting)

For enhanced phone number validation, formatting, and example number placeholders, use the utils version:

```tsx
import IntlTelInput from 'intl-tel-input/reactNativeWithUtils';

const MyComponent = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  return (
    <IntlTelInput
      initialValue=""
      onChangeNumber={(number) => {
        setPhoneNumber(number);
        console.log('Formatted number:', number);
      }}
      onChangeCountry={(country) => console.log('Country:', country)}
      onChangeValidity={(valid) => {
        setIsValid(valid);
        console.log('Is valid:', valid);
      }}
      onChangeErrorCode={(errorCode) => console.log('Error code:', errorCode)}
      usePreciseValidation={true}
      initOptions={{
        initialCountry: "us",
        formatAsYouType: true,
        autoPlaceholder: "aggressive", // Shows example numbers
        separateDialCode: true,
        nationalMode: false,
      }}
      style={{
        marginVertical: 10,
      }}
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `string` | `""` | Initial phone number value (formatted automatically) |
| `onChangeNumber` | `(number: string) => void` | `() => {}` | Called when the phone number changes |
| `onChangeCountry` | `(country: string) => void` | `() => {}` | Called when the selected country changes (ISO2 code) |
| `onChangeValidity` | `(valid: boolean) => void` | `() => {}` | Called when validation status changes |
| `onChangeErrorCode` | `(errorCode: number \| null) => void` | `() => {}` | Called when validation error code changes |
| `usePreciseValidation` | `boolean` | `false` | Use precise validation (requires utils) |
| `initOptions` | `SomeOptions` | `{}` | Configuration options (see below) |
| `inputProps` | `TextInputProps` | `{}` | Props passed to the underlying TextInput component |
| `disabled` | `boolean` | `undefined` | Whether the input is disabled |
| `style` | `ViewStyle` | `undefined` | Style for the main container |
| `dropdownStyle` | `ViewStyle` | `undefined` | Style for country dropdown items |
| `flagStyle` | `TextStyle` | `undefined` | Style for flag emojis |
| `textStyle` | `TextStyle` | `undefined` | Style for text elements |

## Init Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `initialCountry` | `string` | `""` | Initial country selection (ISO2 code) or "auto" for geo IP |
| `excludeCountries` | `string[]` | `[]` | Countries to exclude from dropdown |
| `onlyCountries` | `string[]` | `[]` | Only show these countries (if specified) |
| `countryOrder` | `string[]` | `null` | Custom order for countries in dropdown |
| `separateDialCode` | `boolean` | `false` | Show dial code separately from input |
| `nationalMode` | `boolean` | `true` | Format numbers in national vs international mode |
| `autoPlaceholder` | `"off" \| "polite" \| "aggressive"` | `"polite"` | Placeholder behavior with example numbers |
| `customPlaceholder` | `function` | `null` | Custom placeholder function |
| `formatAsYouType` | `boolean` | `true` | Format number as user types (requires utils) |
| `formatOnDisplay` | `boolean` | `true` | Format number when displaying existing values |
| `allowDropdown` | `boolean` | `true` | Allow country dropdown selection |
| `countrySearch` | `boolean` | `true` | Enable search in country dropdown |
| `showFlags` | `boolean` | `true` | Show country flag emojis |
| `strictMode` | `boolean` | `false` | Enforce strict number length validation |
| `geoIpLookup` | `function` | `null` | Function for geo IP country detection |
| `loadUtils` | `function` | `null` | Function to dynamically load utils |
| `i18n` | `object` | `{}` | Internationalization strings |
| `placeholderNumberType` | `NumberType` | `"MOBILE"` | Type of number for placeholder examples |
| `validationNumberTypes` | `NumberType[]` | `["MOBILE"]` | Valid number types for validation |

## Ref Methods

Access the underlying Iti instance and TextInput using a ref:

```tsx
import React, { useRef } from 'react';
import IntlTelInput, { IntlTelInputRef } from 'intl-tel-input/react-native';

const MyComponent = () => {
  const phoneInputRef = useRef<IntlTelInputRef>(null);

  const handleSubmit = () => {
    const iti = phoneInputRef.current?.getInstance();
    const textInput = phoneInputRef.current?.getInput();

    if (iti) {
      const phoneNumber = iti.getNumber();
      const isValid = iti.isValidNumber();
      const selectedCountry = iti.getSelectedCountryData();
      const errorCode = iti.getValidationError();

      console.log('Phone:', phoneNumber);
      console.log('Valid:', isValid);
      console.log('Country:', selectedCountry);
      console.log('Error code:', errorCode);
    }

    // Access TextInput directly if needed
    if (textInput) {
      textInput.focus();
    }
  };

  return (
    <IntlTelInput
      ref={phoneInputRef}
      initOptions={{ initialCountry: "us" }}
    />
  );
};
```

### Available Ref Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getInstance()` | `Iti \| null` | Get the underlying Iti instance |
| `getInput()` | `TextInput \| null` | Get the TextInput component reference |

### Available Iti Instance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getNumber(format?)` | `string` | Get formatted phone number (international by default) |
| `getSelectedCountryData()` | `SelectedCountryData` | Get selected country object with iso2, dialCode, etc. |
| `getCountries()` | `Country[]` | Get processed countries list |
| `getOptions()` | `AllOptions` | Get current configuration options |
| `getPlaceholder()` | `string` | Get current placeholder text |
| `getExtension()` | `string` | Get phone number extension (utils required) |
| `getNumberType()` | `number` | Get number type (mobile, landline, etc.) |
| `getValidationError()` | `number` | Get validation error code |
| `setCountry(iso2)` | `void` | Set selected country by ISO2 code |
| `setNumber(number)` | `void` | Set phone number and update country |
| `isValidNumber()` | `boolean \| null` | Check if number is valid |
| `isValidNumberPrecise()` | `boolean \| null` | Precise validation (utils required) |
| `destroy()` | `void` | Clean up the instance |

## Styling

Customize the appearance with style props:

```tsx
<IntlTelInput
  style={{
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
  }}
  inputProps={{
    style: {
      fontSize: 16,
      color: '#333',
      paddingHorizontal: 15,
    }
  }}
  textStyle={{
    fontSize: 16,
    color: '#333',
  }}
  flagStyle={{
    fontSize: 24,
    marginRight: 8,
  }}
  dropdownStyle={{
    backgroundColor: '#f8f8f8',
    paddingVertical: 12,
  }}
/>
```

### Style Props

| Prop | Type | Description |
|------|------|-------------|
| `style` | `ViewStyle` | Style for the main container |
| `dropdownStyle` | `ViewStyle` | Style for country dropdown items |
| `flagStyle` | `TextStyle` | Style for flag emojis |
| `textStyle` | `TextStyle` | Style for text elements (country names, dial codes) |
| `inputProps.style` | `TextStyle` | Style for the TextInput component |

## Advanced Usage

### Auto Country Detection

```tsx
<IntlTelInput
  initOptions={{
    initialCountry: "auto",
    geoIpLookup: (success, failure) => {
      fetch('https://ipapi.co/country/')
        .then(response => response.text())
        .then(countryCode => success(countryCode))
        .catch(() => failure());
    },
  }}
/>
```

### Dynamic Utils Loading

```tsx
<IntlTelInput
  initOptions={{
    loadUtils: () => import('intl-tel-input/utils'),
  }}
/>
```

### Custom Placeholder

```tsx
<IntlTelInput
  initOptions={{
    customPlaceholder: (selectedCountryPlaceholder, selectedCountryData) => {
      return `Example: ${selectedCountryPlaceholder}`;
    },
  }}
/>
```

### Internationalization

```tsx
<IntlTelInput
  initOptions={{
    i18n: {
      searchPlaceholder: "Search countries...",
      zeroSearchResults: "No results found",
      oneSearchResult: "1 result found",
      multipleSearchResults: "${count} results found",
      // Country name overrides
      us: "United States",
      gb: "United Kingdom",
    },
  }}
/>
```

## Platform Considerations

### iOS
- Uses native Modal component for country selection with slide animation
- Flag emojis render natively with full Unicode support
- Keyboard type automatically set to `phone-pad`
- Safe area handling for modal on devices with notches
- Supports iOS-specific TextInput props

### Android
- Modal behavior adapts to Android version and device
- Flag emoji support depends on device/OS version (Android 7.0+ recommended)
- Keyboard handling may vary between devices
- Consider testing on various screen sizes and Android versions
- Supports Android-specific TextInput props

## Validation Error Codes

When validation fails, you'll receive specific error codes via the `onChangeErrorCode` callback:

| Code | Constant | Description |
|------|----------|-------------|
| `0` | `IS_POSSIBLE` | The number is valid |
| `1` | `INVALID_COUNTRY_CODE` | Invalid country code |
| `2` | `TOO_SHORT` | Number is too short |
| `3` | `TOO_LONG` | Number is too long |
| `4` | `IS_POSSIBLE_LOCAL_ONLY` | Valid for local use only |
| `5` | `INVALID_LENGTH` | Invalid length |

These codes match the libphonenumber validation error constants.

## TypeScript Support

Full TypeScript support is included with comprehensive type definitions:

```tsx
import IntlTelInput, { IntlTelInputRef } from 'intl-tel-input/react-native';
import { Country, SomeOptions, AllOptions, Iti } from 'intl-tel-input/react-native';

// Type-safe props
const options: SomeOptions = {
  initialCountry: "us",
  formatAsYouType: true,
  nationalMode: false,
};

// Type-safe ref
const phoneRef = useRef<IntlTelInputRef>(null);

// Type-safe callbacks
const handleCountryChange = (countryCode: string) => {
  console.log('Selected country:', countryCode);
};

const handleValidityChange = (isValid: boolean) => {
  console.log('Is valid:', isValid);
};

const handleErrorCodeChange = (errorCode: number | null) => {
  console.log('Error code:', errorCode);
};
```

### Available Types

- `IntlTelInputRef`: Ref interface for accessing component methods
- `Country`: Country data structure
- `SomeOptions`: Partial configuration options
- `AllOptions`: Complete configuration options
- `Iti`: Core instance class
- `SelectedCountryData`: Selected country information
- `NumberType`: Phone number type constants

## Architecture & Implementation

### Core Design Principles

The React Native implementation maintains maximum API compatibility with the main intl-tel-input library while adapting to React Native's component model:

1. **Shared Core Logic**: Uses the same `Iti` class and country data as the web version
2. **Platform Adaptation**: Replaces DOM elements with React Native components
3. **Performance Optimization**: Uses React Native's native components and optimization techniques
4. **Type Safety**: Full TypeScript support with comprehensive type definitions

### Key Differences from Web Version

| Aspect | Web Version | React Native Version |
|--------|-------------|---------------------|
| **UI Components** | DOM elements (`input`, `div`) | React Native components (`TextInput`, `View`, `Modal`) |
| **Flag Display** | CSS sprites | Unicode flag emojis |
| **Dropdown** | Absolute positioned div | Native Modal component |
| **Event Handling** | DOM events | React Native touch events |
| **Styling** | CSS classes | StyleSheet and inline styles |
| **Initialization** | `intlTelInput(inputElement, options)` | `<IntlTelInput initOptions={options} />` |
| **Instance Access** | Direct instance methods | Ref-based access to Iti instance |

### Component Architecture

```
IntlTelInput (React Component)
├── TextInput (phone number input)
├── TouchableOpacity (country selector)
│   ├── Text (flag emoji)
│   ├── Text (dial code - if separateDialCode)
│   └── Text (dropdown arrow)
└── Modal (country selection)
    ├── TextInput (search input)
    └── FlatList (country list)
        └── TouchableOpacity (country items)
            ├── Text (flag)
            ├── Text (country name)
            └── Text (dial code)
```

### State Management

The component manages several state variables:
- `phoneNumber`: Current input value
- `selectedCountry`: Currently selected country data
- `isDropdownVisible`: Modal visibility state
- `filteredCountries`: Search-filtered country list
- `searchQuery`: Country search query
- `placeholder`: Dynamic placeholder text

### Integration with Core Library

The React Native component creates and manages an `Iti` instance internally:

```tsx
const itiRef = useRef<Iti | null>(null);

useEffect(() => {
  itiRef.current = intlTelInput(textInputRef.current, initOptions);
}, [initOptions]);
```

This ensures that all core functionality (validation, formatting, country detection) works identically to the web version.

## Testing

The React Native implementation includes comprehensive Jest tests that mirror the main library's test structure:

```bash
cd react-native/__tests__
npm test
```

### Test Coverage

- **Core functionality**: Country processing, dial code mapping, validation
- **Component behavior**: State management, event handling, UI interactions
- **Utils integration**: Formatting, validation with utils loaded
- **Edge cases**: Invalid inputs, country changes, placeholder updates

### Running Tests

```bash
# Install test dependencies
cd react-native/__tests__
npm install

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- intl-tel-input.test.ts
```

## Troubleshooting

### Common Issues

**Flag emojis not displaying properly**
- Ensure your device/emulator supports Unicode flag emojis (Android 7.0+)
- Consider using a fallback flag display method for older devices

**Utils not loading**
- Make sure you're using the `reactNativeWithUtils` import for enhanced features
- Check that your bundler supports dynamic imports if using `loadUtils`

**Country detection not working**
- Verify your `geoIpLookup` function is correctly implemented
- Check network connectivity for IP-based country detection

**Validation issues**
- Ensure you're using the utils version for precise validation
- Check that the phone number format matches the selected country

**Performance on large country lists**
- The component uses `FlatList` for optimal performance with 244+ countries
- Search functionality helps users quickly find countries

## Contributing

Issues and pull requests are welcome! Please check the main [intl-tel-input repository](https://github.com/jackocnr/intl-tel-input) for contribution guidelines.

### Development Setup

1. Clone the main repository
2. Navigate to `react-native/` directory
3. Make your changes to the source files
4. Run tests: `cd __tests__ && npm test`
5. Build: `npm run build:react-native` (from root)

## License

MIT - See the main repository for full license details.
