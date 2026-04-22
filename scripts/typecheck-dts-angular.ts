// Consumer-style smoke test for the Angular wrapper's generated .d.ts files.
// See scripts/typecheck-dts.ts for the rationale.

import IntlTelInput, { intlTelInput, type StrictRejectDetail } from "intl-tel-input/angular";
import IntlTelInputWithUtils from "intl-tel-input/angularWithUtils";

void intlTelInput;

const _instance = {} as IntlTelInput;
const _lifecycle: Pick<IntlTelInput, "ngAfterViewInit" | "ngOnChanges" | "ngOnDestroy"> = _instance;
void _lifecycle;

const _detail: StrictRejectDetail = { source: "key", rejectedInput: "abc", reason: "invalid" };
void _detail;

const _sameClass: typeof IntlTelInput = IntlTelInputWithUtils;
void _sameClass;

export {};
