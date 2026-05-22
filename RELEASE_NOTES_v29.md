# v29.0.0

This release is a large naming cleanup. One big theme is moving from "dropdown" to "countrySelector" language in cases where it can be either a dropdown or a fullscreen popup depending on context (while still keeping "dropdown" when it only applies to that context). This impacts options, methods, events, CSS classes, and CSS variables. A handful of other options were also clarified or restructured along the way.

There are **no behavioural changes for end users**, but **almost every integration will need some find-and-replace work**. There are also two new public instance methods, a fix that makes `dropdownParent` (previously: `dropdownContainer`) reposition on scroll instead of closing, and two focus-related bug fixes.

## Breaking changes

### Options

| Before | After | Notes |
|---|---|---|
| `geoIpLookup` | `initialCountryLookup` | Also no longer requires `initialCountry: "auto"` — just set `initialCountryLookup` on its own. Still ignored if `initialCountry` is set. |
| `nationalMode` + `formatOnDisplay` | `numberDisplayFormat` | A single option that takes one of `"E164"`, `"INTERNATIONAL"` (default), or `"NATIONAL"`. See migration notes below. |
| `hiddenInput` | `hiddenInputs` | Function signature is unchanged. |
| `autoPlaceholder` | `placeholderNumberPolicy` | Values are now uppercase: `"POLITE"` (default), `"AGGRESSIVE"`, `"OFF"`. |
| `fixDropdownWidth` | `matchDropdownWidth` | Same default (`true`), same behaviour. Renamed because "fix" sounded like a bugfix. |
| `i18n` | `uiTranslations` | The shape of the object is unchanged. |
| `allowDropdown` + `useFullscreenPopup` | `countrySelectorMode` | A single option that takes one of`"DROPDOWN"`, `"FULLSCREEN"`, `"AUTO"` (default), or `"OFF"`. See migration notes below. |
| `dropdownContainer` | `dropdownParent` | Renamed. Also: scrolling an ancestor now repositions the open dropdown instead of closing it, so the previous workarounds for sticky/fixed containers are no longer needed. |

#### `numberDisplayFormat` migration

Replace `nationalMode` and `formatOnDisplay` as follows:

| Before | After |
|---|---|
| _(defaults)_ | `numberDisplayFormat: "INTERNATIONAL"` (default — no change needed) |
| `nationalMode: true` | `numberDisplayFormat: "NATIONAL"` |
| `formatOnDisplay: false` | _no direct replacement — closest is `numberDisplayFormat: "E164"`_ |

#### `countrySelectorMode` migration

| Before | After |
|---|---|
| _(defaults)_ | `countrySelectorMode: "AUTO"` (default — picks `"FULLSCREEN"` on narrow viewports, `"DROPDOWN"` otherwise) |
| `allowDropdown: false` | `countrySelectorMode: "OFF"` |
| `useFullscreenPopup: true` | `countrySelectorMode: "FULLSCREEN"` |
| `useFullscreenPopup: false` | `countrySelectorMode: "DROPDOWN"` |

### Instance methods

| Before | After |
|---|---|
| `iti.getSelectedCountryData()` | `iti.getSelectedCountry()` |
| `iti.setCountry(iso2)` | `iti.setSelectedCountry(iso2)` |

### Static methods

| Before | After |
|---|---|
| `intlTelInput.getCountryData()` | `intlTelInput.getAllCountries()` |

### Utils validation methods

The two utils validators have been renamed to align with the matching instance methods (`iti.isValidNumber()` / `iti.isValidNumberPrecise()`). The behaviour of each function is unchanged — only the names have moved.

| Behaviour | Before (v28) | After (v29) |
|---|---|---|
| Length-based check (more future-proof) | `utils.isPossibleNumber` | `utils.isValidNumber` |
| Precise country/area-code check | `utils.isValidNumber` | `utils.isValidNumberPrecise` |

The instance methods (`iti.isValidNumber()` and `iti.isValidNumberPrecise()`) are unchanged.

### `utils.getExampleNumber` signature

Changed from `(iso2, nationalMode, numberType, useE164)` to `(iso2, numberType, format)` — the two booleans are now a single `format` string (`"E164"` / `"INTERNATIONAL"` / `"NATIONAL"` / `"RFC3966"`).

### DOM events

| Before | After |
|---|---|
| `open:countrydropdown` | `open:countryselector` |
| `close:countrydropdown` | `close:countryselector` |

### React / Vue / Angular / Svelte wrapper props & emits

The `CountryDropdown` part of the name has been renamed to `CountrySelector` everywhere. The exact name follows each framework's convention:

| Framework | Before | After |
|---|---|---|
| React (prop) | `onOpenCountryDropdown` / `onCloseCountryDropdown` | `onOpenCountrySelector` / `onCloseCountrySelector` |
| Svelte (prop) | `onOpenCountryDropdown` / `onCloseCountryDropdown` | `onOpenCountrySelector` / `onCloseCountrySelector` |
| Vue (emit) | `openCountryDropdown` / `closeCountryDropdown` | `openCountrySelector` / `closeCountrySelector` |
| Angular (`@Output`) | `openCountryDropdown` / `closeCountryDropdown` | `openCountrySelector` / `closeCountrySelector` |

### CSS classes

If you have custom styling that targets any of these, update the selectors:

| Before | After |
|---|---|
| `.iti__dropdown-content` | `.iti__country-selector` |
| `.iti--inline-dropdown` | `.iti--inline-country-selector` |
| `.iti--container` | `.iti--detached-country-selector` |
| `.iti--allow-dropdown` | `.iti--has-country-selector` |

### CSS variables

| Before | After |
|---|---|
| `--iti-dropdown-bg` | `--iti-country-selector-bg` |

### Locale imports (subpath)

The translations directory has been renamed from `i18n/` to `locale/`. If you import translation files via the npm subpath, update them:

```diff
- import { ar } from "intl-tel-input/i18n";
+ import { ar } from "intl-tel-input/locale";
```

(And remember to pass them via `uiTranslations`, not `i18n`.)

---

## New

- **`iti.openCountrySelector()`** and **`iti.closeCountrySelector()`** — new public instance methods for programmatically opening/closing the country selector (e.g. from a custom UI control, or to close it in response to a scroll event the library doesn't otherwise see).
- **`dropdownParent` repositions on scroll** instead of closing — previously, scrolling an ancestor of the input would close the open dropdown. It now stays open and tracks the input position.

## Fixes

- Don't disturb a focused input when `initialCountryLookup` resolves late (could previously interrupt typing if the lookup finished after the user had started typing).
- Don't re-format the input value on utils load if the input is already focused (same reason).
