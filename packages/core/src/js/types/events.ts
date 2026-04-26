// Shared event type map for IntlTelInput custom events
// Exported as a type-only module to be reused across implementations (vanilla, react, angular, vue)
// Uses centralised string constants to avoid magic strings & ensure consistency.
import { EVENTS } from "../constants.js";
import type { SelectedCountryData } from "../types/public-api.js";

export type StrictRejectSource = "key" | "paste";
export type StrictRejectReason = "invalid" | "max-length";

export type ItiEventMap = {
  [EVENTS.COUNTRY_CHANGE]: SelectedCountryData;
  [EVENTS.OPEN_COUNTRY_DROPDOWN]: Record<string, never>;
  [EVENTS.CLOSE_COUNTRY_DROPDOWN]: Record<string, never>;
  [EVENTS.INPUT]: { isSetNumber?: boolean; isCountryChange?: boolean };
  [EVENTS.STRICT_REJECT]: {
    source: StrictRejectSource;
    rejectedInput: string;
    reason: StrictRejectReason;
  };
};
