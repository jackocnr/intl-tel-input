import { I18n } from "../types";
import countryTranslations from "./countries.ts";
import interfaceTranslations from "./interface.ts";

export { countryTranslations, interfaceTranslations };

const allTranslations: I18n = { ...countryTranslations, ...interfaceTranslations };
export default allTranslations;
