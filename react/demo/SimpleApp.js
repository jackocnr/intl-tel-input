/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createRoot } from 'react-dom/client';
import IntlTelInput from '../build/IntlTelInput.cjs';

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <IntlTelInput
    initOptions={{
      initialCountry: "us",
      // use a CDN so it works on intl-tel-input.com
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.1.0/build/js/utils.js",
    }}
  />
);