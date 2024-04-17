const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {
  grunt.registerTask('build:translations', 'Generate country translations', function() {
    const countryTranslationSourceDirectory = 'third_party/country-list/data';
    const supportedLocalesDirectory = "src/js/i18n";
    const buildDirectory = 'build/js/i18n';
    const rootIndexFilePath = path.join(supportedLocalesDirectory, 'index.mjs');
    let rootIndexFileContent = "";

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

    //* STEP 1: For each supported locale: pull in the country name translations and generate the index file.
    supportedLocales.forEach(locale => {
      const countryTranslationFilePath = path.join(countryTranslationSourceDirectory, locale, 'country.json');
      const countryTranslationExists = fs.existsSync(countryTranslationFilePath);
      const destinationDir = path.join(supportedLocalesDirectory, locale);
      const countriesDestinationFilePath = path.join(destinationDir, 'countries.mjs');
      const indexFilePath = path.join(destinationDir, 'index.mjs');
      const interfaceTranslationFilePath = path.join(supportedLocalesDirectory, locale, 'interface.mjs');
      const interfaceTranslationExists = fs.existsSync(interfaceTranslationFilePath);


      //* If the interface file does not exist, skip the iteration.
      if (!interfaceTranslationExists) {
        grunt.log.writeln(`WARNING: Missing interface file: ${interfaceTranslationFilePath} - skipping this locale.\n`);
        return;
      }
      //* If the interface file does not exist, skip the iteration.
      if (!countryTranslationExists) {
        grunt.log.writeln(`WARNING: Missing country file: ${countryTranslationFilePath} - skipping this locale.\n`);
        return;
      }

      //* Add the locale export to the content of the root index.mjs file
      rootIndexFileContent += `export { default as ${locale} } from "./${locale}/index.mjs";\n`;

      //* Create the Locale Index file Start
      let indexFileContent = '';
      indexFileContent += `import countryTranslations from "./countries.mjs";\n`;
      indexFileContent += `import interfaceTranslations from "./interface.mjs";\n\n`;
      indexFileContent += `export default { ...countryTranslations, ...interfaceTranslations };\n`;
      fs.writeFileSync(indexFilePath, indexFileContent);
      grunt.log.writeln(`Generated ${indexFilePath}`);

      //* Create the countries.mjs file
      const jsonData = fs.readFileSync(countryTranslationFilePath, 'utf8'); //* Read the JSON file.
      try {
        const parsedData = JSON.parse(jsonData); //* Parse JSON data.
        let countryTranslationFileContent = "//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n";
        countryTranslationFileContent += 'export default {\n';

        Object.keys(parsedData).forEach(key => {
          countryTranslationFileContent += `  ${key.toLowerCase()}: "${parsedData[key]}",\n`;
        });

        countryTranslationFileContent += '};\n';
        fs.writeFileSync(countriesDestinationFilePath, countryTranslationFileContent); //* Write to new file.
        grunt.log.writeln(`Generated ${countriesDestinationFilePath} from ${countryTranslationFilePath}`);
      } catch (error) {
        grunt.log.error(`Error parsing JSON file ${countryTranslationFilePath}: ${error.message}`);
      }
      grunt.log.writeln("");
    });
    fs.writeFileSync(rootIndexFilePath, rootIndexFileContent);

    //* STEP 2: Copy the whole i18n dir to the build folder.
    fs.cpSync(supportedLocalesDirectory, buildDirectory, {recursive: true});
  });
};
