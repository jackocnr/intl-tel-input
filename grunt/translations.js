const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {
  grunt.registerTask('build:translations', 'Generate country translations', function() {
    const skipUnsupportedCountries = true;
    const defaultLanguageCode = "en";
    const countryTranslationSourceDirectory = 'third_party/country-list/data';
    const interfaceTranslationSourceDirectory = "src/i18n/interface";
    const outputDirectory = 'build/i18n';
    const rootIndexFilePath = path.join(outputDirectory, 'index.mjs');
    let rootIndexFileContent = "";

    //* Ensure destination directory exists and create it recursively.
    if(!fs.existsSync(outputDirectory)) fs.mkdirSync(outputDirectory, true);

    //* Get list of country translation directories.
    const countryTranslationDirectories = fs.readdirSync(countryTranslationSourceDirectory, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);

    grunt.log.writeln(`Available country translations: ${countryTranslationDirectories.join(", ")}.\n`);

    //* Get the list of translations that exist for the interface
    const interfaceAvailableLocales = fs.readdirSync(interfaceTranslationSourceDirectory)
      .filter(file => path.extname(file) === '.mjs')
      .map(file => path.basename(file, '.mjs'));

    grunt.log.writeln(`Supported countries: ${interfaceAvailableLocales.join(", ")}.\n`);

    //* Loop over country directories.
    countryTranslationDirectories.forEach(country => {
      const lowerCaseCountry = country.toLowerCase();
      const countryTranslationFilePath = path.join(countryTranslationSourceDirectory, country, 'country.json');
      const countryTranslationFileExists = fs.existsSync(countryTranslationFilePath);
      const destinationDir = path.join(outputDirectory, lowerCaseCountry);
      const destinationFilePath = path.join(destinationDir, 'countries.mjs');
      const indexFilePath = path.join(destinationDir, 'index.mjs');
      const interfaceTranslationExists = interfaceAvailableLocales.includes(lowerCaseCountry);
      const interfaceTranslationSourceFilePath = path.join(interfaceTranslationSourceDirectory, `${lowerCaseCountry}.mjs`);
      const interfaceTranslationDestinationFilePath = path.join(destinationDir, 'interface.mjs')

      let indexFileContent = '';
      let countryTranslationFileContent = '';

      //* If the interface file does not exist and skip unsupported country is enabled don't skip the itteration.
      if(!interfaceTranslationExists && skipUnsupportedCountries) return;

      //* Ensure country directory exists.
      if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir, { recursive: true });

      //* Add the locale export to the content of the root index.mjs file
      rootIndexFileContent += `export { default as ${lowerCaseCountry} } from "./${lowerCaseCountry}/index.mjs";\n`;

      //* Copy the interface translations to the dist folder if it exists.
      if(interfaceTranslationExists){
        fs.copyFileSync(interfaceTranslationSourceFilePath, interfaceTranslationDestinationFilePath);
        console.log(`Copied ${interfaceTranslationSourceFilePath} to ${interfaceTranslationDestinationFilePath}`);
      } else {
        console.log(`No interface translation found for ${lowerCaseCountry}`);
      }

      //* Cereate the Locale Index file Start
      if(countryTranslationFileExists) {
        indexFileContent += `import countryTranslations from "./countries.mjs";\n`;
      } else {
        indexFileContent += `import countryTranslations from "../${defaultLanguageCode}/countries.mjs";\n`;
      }

      if(interfaceTranslationExists){
        indexFileContent += `import interfaceTranslations from "./interface.mjs";\n\n`;
      } else {
        indexFileContent += `import interfaceTranslations from "../${defaultLanguageCode}/interface.mjs";\n\n`;
      }

      indexFileContent += `export default {...countryTranslations, ...interfaceTranslations};\n`;

      fs.writeFileSync(indexFilePath, indexFileContent);
      grunt.log.writeln(`Generated ${indexFilePath}`);
      //* Cereate the Locale Index file End

      if (countryTranslationFileExists) {
        const jsonData = fs.readFileSync(countryTranslationFilePath, 'utf8'); //* Read the JSON file.
        try {
          const parsedData = JSON.parse(jsonData); //* Parse JSON data.
          countryTranslationFileContent += 'export default {\n';

          Object.keys(parsedData).forEach(key => {
            countryTranslationFileContent += `  ${key.toLowerCase()}: "${parsedData[key]}",\n`;
          });

          countryTranslationFileContent += '};\n';
          fs.writeFileSync(destinationFilePath, countryTranslationFileContent); //* Write to new file.
          grunt.log.writeln(`Generated ${destinationFilePath} from ${countryTranslationFilePath}`);

        } catch (error) {
          grunt.log.error(`Error parsing JSON file ${countryTranslationFilePath}: ${error.message}`);
        }
      } else {
        grunt.log.error(`Country.json file not found in directory ${path.join(countryTranslationSourceDirectory, country)}`);
      }
      grunt.log.writeln("");
    });
    fs.writeFileSync(rootIndexFilePath, rootIndexFileContent);
  });
};
