/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createRoot } from 'react-dom/client';
import IntlTelInput from '../build/IntlTelInput.cjs';

// defined in package.json scripts section
const version = process.env.VERSION;

const App = () => (
  <IntlTelInput
    initOptions={{
      initialCountry: "us",
      // use a CDN so it also works on intl-tel-input.com
      utilsScript: `https://cdn.jsdelivr.net/npm/intl-tel-input@${version}/build/js/utils.js`,
    }}
  />
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);