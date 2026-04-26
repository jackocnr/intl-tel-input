// Consumer-style smoke test for the React wrapper's generated .d.ts files.
// See scripts/typecheck-dts.ts for the rationale.

import IntlTelInput, {
  intlTelInput,
  type IntlTelInputRef,
  type StrictRejectReason,
  type StrictRejectSource,
} from "@intl-tel-input/react";
import IntlTelInputWithUtils from "@intl-tel-input/react/with-utils";
import { useRef } from "react";

void intlTelInput;

function _Example() {
  const ref = useRef<IntlTelInputRef>(null);
  return (
    <>
      <IntlTelInput
        ref={ref}
        initialCountry="gb"
        separateDialCode
        onChangeNumber={(n) => void n}
        onChangeCountry={(iso) => void iso}
        onChangeValidity={(v) => void v}
        onStrictReject={(src: StrictRejectSource, input: string, reason: StrictRejectReason) => {
          void [src, input, reason];
        }}
      />
      <IntlTelInputWithUtils ref={ref} initialCountry="us" />
    </>
  );
}
void _Example;

export {};
