//* Extract the numeric digits from the given string (\D matches any non-digit).
export const getNumeric = (s: string): string => s.replace(/\D/g, "");

//* Normalise string: turns "Réunion" into "Reunion".
//* from https://stackoverflow.com/a/37511463
export const normaliseString = (s: string = ""): string =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();