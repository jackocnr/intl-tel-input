import intlTelInput from "intl-tel-input";
import utils from "intl-tel-input/utils";
intlTelInput.utils = utils as typeof intlTelInput.utils;
export { intlTelInput };
export type { IntlTelInputRef } from "./IntlTelInput.js";
export { default } from "./IntlTelInput.js";
