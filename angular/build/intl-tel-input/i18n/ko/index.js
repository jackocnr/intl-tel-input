import countryTranslations from "./countries.js";
import interfaceTranslations from "./interface.js";
export { countryTranslations, interfaceTranslations };
const allTranslations = Object.assign(Object.assign({}, countryTranslations), interfaceTranslations);
export default allTranslations;
