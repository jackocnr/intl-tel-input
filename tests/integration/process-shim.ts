// Some testing libraries (e.g. @testing-library/vue) reference `process.env`
// when run in the browser. Provide a minimal shim before anything else imports them.
(globalThis as unknown as { process?: { env: Record<string, string> } }).process ??= {
  env: {},
};
