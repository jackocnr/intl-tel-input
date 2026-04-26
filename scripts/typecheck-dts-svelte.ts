// Consumer-style smoke test for the Svelte wrapper's hand-written .d.ts.
// See scripts/typecheck-dts.ts for the rationale. The Svelte .d.ts is
// hand-written (svelte2tsx can't emit correct types for Svelte 5's $props()),
// so this is the only thing that guards it against drift from the underlying
// intl-tel-input types.

import IntlTelInput, {
  intlTelInput,
  type Props,
  type StrictRejectReason,
  type StrictRejectSource,
} from "@intl-tel-input/svelte";
import IntlTelInputWithUtils from "@intl-tel-input/svelte/with-utils";

void intlTelInput;

const _props: Props = {
  initialCountry: "gb",
  separateDialCode: true,
  disabled: false,
  onChangeNumber: (n) => void n,
  onChangeCountry: (iso) => void iso,
  onStrictReject: (src: StrictRejectSource, input: string, reason: StrictRejectReason) => {
    void [src, input, reason];
  },
};
void _props;

const _component: typeof IntlTelInput = IntlTelInputWithUtils;
void _component;

export {};
