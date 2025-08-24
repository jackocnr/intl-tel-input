export type Country = {
    name: string;
    iso2: string;
    dialCode: string;
    priority: number;
    areaCodes: string[] | null;
    nodeById: object;
    nationalPrefix: string | null;
};
declare const allCountries: Country[];
export default allCountries;
