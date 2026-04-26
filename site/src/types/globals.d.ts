// Ambient declarations for globals used by the site sources.
// The intl-tel-input library is loaded via a separate <script> tag and
// attached to the window — we re-use its real type declarations from the
// built .d.ts in the parent project so the playground gets accurate types.

import type { IntlTelInputInterface } from "../../../packages/core/dist/js/intlTelInput";

declare global {
  interface Window {
    intlTelInput: IntlTelInputInterface;
    bootstrap: any;
    hljs: any;
  }
}

// The site sources lazy-load utils via dynamic import using URL paths that
// resolve to the library at runtime; tsc can't follow those paths.
declare module "*intl-tel-input/js/utils.js";
declare module "*/utils.js";

// Stub the generated playground constants module — it's emitted into tmp/
// at build time so it may not exist when tsc runs.
declare module "*playgroundConstants.js" {
  export const I18N_LANGUAGE_CODES: string[];
  export const UTILS_PATH: string;
  export const I18N_DIR_HASH: string;
}

export {};
