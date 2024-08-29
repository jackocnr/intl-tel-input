# IntlTelInput Vue Component
A Vue component wrapper for the [intl-tel-input](https://github.com/jackocnr/intl-tel-input) JavaScript plugin. View the [source code](https://github.com/jackocnr/intl-tel-input/blob/master/vue/src/intl-tel-input/IntlTelInput.vue).

## Table of Contents
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Props](#props)

## Demo
Try it for yourself by downloading the project and running `npm install` and then `npm run vue:demo` and then copying the given URL into your browser.

## Getting Started
```vue
<script setup>
  import IntlTelInput from "intl-tel-input/vueWithUtils";
  import "intl-tel-input/styles";
</script>

<template>
  <IntlTelInput
    :options="{
      initialCountry: 'us',
    }"
  />
</template>
```

See the [Validation demo](https://github.com/jackocnr/intl-tel-input/blob/master/vue/demo/validation/App.vue) for a more fleshed-out example of how to handle validation [COMING SOON].

A note on the utils script (~260KB): if you're lazy loading the IntlTelInput chunk (and so less worried about filesize) then you can just import IntlTelInput from `"intl-tel-input/vueWithUtils"`, to include the utils script. Alternatively, if you use the main `"intl-tel-input/vue"` import, then you should couple this with the `utilsScript` initialisation option - you will need to host the [utils.js](https://github.com/jackocnr/intl-tel-input/blob/master/build/js/utils.js) file, and then set the `utilsScript` option to that URL, or alternatively just point it to a CDN hosted version e.g. `"https://cdn.jsdelivr.net/npm/intl-tel-input@24.3.6/build/js/utils.js"`.

## Props
Here's a list of all of the current props you can pass to the IntlTelInput Vue component.

**options**  
Type: `Object`  
An object containing the [initialisation options](https://github.com/jackocnr/intl-tel-input?tab=readme-ov-file#initialisation-options) to pass to the plugin. You can use these exactly the same way as with the main JavaScript plugin.

[MORE COMING SOON]
