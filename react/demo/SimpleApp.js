/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { createRoot } from 'react-dom/client';
import IntlTelInput from '../build/IntlTelInput.esm';

const App = () => (
  <IntlTelInput
    initOptions={{
      initialCountry: "us",
      utilsScript: "../../build/js/utils.js",
    }}
  />
);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);