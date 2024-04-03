declare global {
    type Country = {
        name: string;
        iso2: string;
        dialCode: string;
        priority: number;
        areaCodes: string[] | null;
        nodeById: object;
    };
}
declare const allCountries: Country[];
export default allCountries;
