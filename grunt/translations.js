const fs = require('fs');
const path = require('path');
// ts-node allows us to require TypeScript files
require("ts-node").register();
const supportedCountries = require('../src/js/intl-tel-input/data.ts').default;

module.exports = function(grunt) {
  grunt.registerTask('translations', 'Generate country translations', function() {
    //* Upper case to match the country codes in the country-list lib.
    const supportedCountryCodes = supportedCountries.map(country => country.iso2.toUpperCase());
    const countryTranslationSourceDirectory = 'third_party/country-list/data';
    const supportedLocalesDirectory = "src/js/intl-tel-input/i18n";
    const rootIndexFilePath = path.join(supportedLocalesDirectory, 'index.ts');
    let rootIndexFileContent = "//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n";

    //* Get list of country translation locales in the country-list submodule.
    const countryTranslationDirectories = fs.readdirSync(countryTranslationSourceDirectory, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);

    grunt.log.writeln(`Available country name translations: ${countryTranslationDirectories.join(", ")}.\n`);

    //* Get list of interface translation locales that exist in this project.
    const supportedLocales = fs.readdirSync(supportedLocalesDirectory, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);

    grunt.log.writeln(`Supported locales: ${supportedLocales.join(", ")}.\n`);

    //* For each supported locale: pull in the country name translations and generate the index file.
    supportedLocales.forEach(locale => {
      const countryTranslationFilePath = path.join(countryTranslationSourceDirectory, locale, 'country.json');
      const countryTranslationExists = fs.existsSync(countryTranslationFilePath);
      const destinationDir = path.join(supportedLocalesDirectory, locale);
      const countriesDestinationFilePath = path.join(destinationDir, 'countries.ts');
      const indexFilePath = path.join(destinationDir, 'index.ts');
      const interfaceTranslationFilePath = path.join(supportedLocalesDirectory, locale, 'interface.ts');
      const interfaceTranslationExists = fs.existsSync(interfaceTranslationFilePath);


      //* If the interface file does not exist, skip the iteration.
      if (!interfaceTranslationExists) {
        grunt.log.writeln(`WARNING: Missing interface file: ${interfaceTranslationFilePath} - skipping this locale.\n`);
        return;
      }
      //* If the countries file does not exist, skip the iteration.
      if (!countryTranslationExists) {
        grunt.log.writeln(`WARNING: Missing country file: ${countryTranslationFilePath} - skipping this locale.\n`);
        return;
      }

      //* Add the locale export to the content of the root index.ts file
      rootIndexFileContent += `export { default as ${locale}, countryTranslations as ${locale}CountryTranslations, interfaceTranslations as ${locale}InterfaceTranslations } from "./${locale}";\n`;

      //* Create the Locale Index file Start
      let localeIndexFileContent = `//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n`;
      localeIndexFileContent += `import { I18n } from "../types";\n`;
      localeIndexFileContent += `import countryTranslations from "./countries.js";\n`;
      localeIndexFileContent += `import interfaceTranslations from "./interface.js";\n\n`;
      localeIndexFileContent += `export { countryTranslations, interfaceTranslations };\n\n`;
      localeIndexFileContent += `const allTranslations: I18n = { ...countryTranslations, ...interfaceTranslations };\n`;
      localeIndexFileContent += `export default allTranslations;\n`;
      fs.writeFileSync(indexFilePath, localeIndexFileContent);
      grunt.log.writeln(`Generated ${indexFilePath}`);

      //* Create the countries.ts file
      const jsonData = fs.readFileSync(countryTranslationFilePath, 'utf8'); //* Read the JSON file.
      try {
        const parsedData = JSON.parse(jsonData); //* Parse JSON data.
        let countryTranslationFileContent = "//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n";
        countryTranslationFileContent += 'import { I18n } from "../types";\n\n';
        countryTranslationFileContent += 'const countryTranslations: I18n = {\n';

        //* Filter out any country codes that we do not support.
        const keys = Object.keys(parsedData).filter(iso => supportedCountryCodes.includes(iso)).sort();
        keys.forEach(key => {
          countryTranslationFileContent += `  ${key.toLowerCase()}: "${parsedData[key]}",\n`;
        });

        countryTranslationFileContent += '};\n\n';
        countryTranslationFileContent += 'export default countryTranslations;\n';
        fs.writeFileSync(countriesDestinationFilePath, countryTranslationFileContent); //* Write to new file.
        grunt.log.writeln(`Generated ${countriesDestinationFilePath} from ${countryTranslationFilePath}`);
      } catch (error) {
        grunt.log.error(`Error parsing JSON file ${countryTranslationFilePath}: ${error.message}`);
      }
      grunt.log.writeln("");
    });
    fs.writeFileSync(rootIndexFilePath, rootIndexFileContent);
  });
};
