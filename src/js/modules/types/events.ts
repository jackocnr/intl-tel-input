// Shared event type map for IntlTelInput custom events
// Exported as a type-only module to be reused across implementations (vanilla, react, angular, vue)
// Uses centralised string constants to avoid magic strings & ensure consistency.
import { EVENTS } from "../constants";

export type ItiEventMap = {
  [EVENTS.COUNTRY_CHANGE]: Record<string, never>;
  [EVENTS.OPEN_COUNTRY_DROPDOWN]: Record<string, never>;
  [EVENTS.CLOSE_COUNTRY_DROPDOWN]: Record<string, never>;
  [EVENTS.INPUT]: { isSetNumber?: boolean };
};
