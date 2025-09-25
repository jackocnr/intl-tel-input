// Shared event type map for IntlTelInput custom events
// Exported as a type-only module to be reused across implementations (vanilla, react, angular, vue)
export type ItiEventMap = {
  "countrychange": Record<string, never>;
  "open:countrydropdown": Record<string, never>;
  "close:countrydropdown": Record<string, never>;
  "input": { isSetNumber?: boolean };
};
