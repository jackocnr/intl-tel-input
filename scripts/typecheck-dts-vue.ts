// Consumer-style smoke test for the Vue wrapper's generated .d.ts files.
// See scripts/typecheck-dts.ts for the rationale.

import IntlTelInput, { intlTelInput } from "@intl-tel-input/vue";
import IntlTelInputWithUtils from "@intl-tel-input/vue/with-utils";

void intlTelInput;

type _Props = InstanceType<typeof IntlTelInput>["$props"];
type _PropsWithUtils = InstanceType<typeof IntlTelInputWithUtils>["$props"];

const _initial: _Props = { initialCountry: "gb", separateDialCode: true };
void _initial;
const _initialWithUtils: _PropsWithUtils = { initialCountry: "gb" };
void _initialWithUtils;

export {};
