// Ambient declaration to satisfy TypeScript when using Vite's `define` to inject process.env.VERSION.
// `env` is non-optional because src/js/intlTelInput.ts (pulled into the IDE program via the
// tsconfig.app.json paths mapping) does `process.env.VERSION` without a null check, and Vite
// replaces that expression at build time.
declare const process: {
  env: {
    VERSION?: string;
  };
};
