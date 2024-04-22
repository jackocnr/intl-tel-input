import countryTranslations from "./countries.mjs";
import interfaceTranslations from "./interface.mjs";

export { countryTranslations, interfaceTranslations };
export default { ...countryTranslations, ...interfaceTranslations };
