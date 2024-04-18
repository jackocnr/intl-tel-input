import countryTranslations from "./countries.mjs";
import interfaceTranslations from "./interface.mjs";

export { default as countryTranslations } from "./countries.mjs";
export { default as interfaceTranslations } from "./interface.mjs";

export default { ...countryTranslations, ...interfaceTranslations };
