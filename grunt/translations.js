const fs = require('fs');
const path = require('path');

module.exports = function(grunt) {
  grunt.registerTask('build:translations', 'Generate country translations', function() {
    const sourceDir = 'third_party/country-list/data';
    const destinationRootDir = 'build/i18n';

    //* Ensure destination directory exists.
    if (!fs.existsSync(destinationRootDir)) {
      fs.mkdirSync(destinationRootDir, { recursive: true });
    }

    //* Get list of country directories.
    const countryDirs = fs.readdirSync(sourceDir, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);


    const suportedCountries = fs.readdirSync("src/i18n")
      .filter(file => path.extname(file) === '.mjs')
      .map(file => path.basename(file, '.mjs'));

    grunt.log.writeln(`Supported countries: ${suportedCountries.join(", ")}.\n`);


    const RootIndexFilePath = path.join(destinationRootDir, 'index.mjs');
    let rootIndexFileContent = "";

    //* Loop over country directories.
    countryDirs.forEach(country => {
      const lowerCaseCountry = country.toLowerCase()

      if(!suportedCountries.includes(lowerCaseCountry)) return;

      rootIndexFileContent += `export { default as ${lowerCaseCountry} } from "./${lowerCaseCountry}/index.mjs";\n`;

      const countryJsonPath = path.join(sourceDir, country, 'country.json');
      const destinationDir = path.join(destinationRootDir, lowerCaseCountry);
      const destinationFilePath = path.join(destinationDir, 'countries.mjs');
      const indexFilePath = path.join(destinationDir, 'index.mjs');

      //* Ensure country directory exists.
      if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir, { recursive: true });


      //* Copy the interface translations to the dist folder.
      const InterfaceTranslationSourceFilePath = path.join('src/i18n', `${lowerCaseCountry}.mjs`);
      const InterfaceTranslationDestinationFilePath = path.join(destinationDir, 'interface.mjs')
      fs.copyFileSync(InterfaceTranslationSourceFilePath, InterfaceTranslationDestinationFilePath);
      console.log(`Copied ${InterfaceTranslationSourceFilePath} to ${InterfaceTranslationDestinationFilePath}`);


      if (fs.existsSync(countryJsonPath)) {
        const jsonData = fs.readFileSync(countryJsonPath, 'utf8'); //* Read the JSON file.
        try {
          const parsedData = JSON.parse(jsonData); //* Parse JSON data.
          let exportData = 'export default {\n';

          Object.keys(parsedData).forEach(key => {
            exportData += `  ${key.toLowerCase()}: "${parsedData[key]}",\n`;
          });

          exportData += '};\n';

          fs.writeFileSync(destinationFilePath, exportData); //* Write to new file.
          grunt.log.writeln(`Generated ${destinationFilePath} from ${countryJsonPath}`);

        } catch (err) {
          grunt.log.error(`Error parsing JSON file ${countryJsonPath}: ${err.message}`);
        }

        try {
          let indexFileContent = ''
          indexFileContent += 'import countryTranslations from "./countries.mjs";\n';
          indexFileContent += 'import interfaceTranslations from "./interface.mjs";\n\n';
          indexFileContent += 'export default {...countryTranslations, ...interfaceTranslations};\n';

          fs.writeFileSync(indexFilePath, indexFileContent);
          grunt.log.writeln(`Generated ${indexFilePath}`);
        } catch (err) {
          grunt.log.error(`Error making file ${indexFilePath}: ${err.message}`);
        }
      } else {
        grunt.log.error(`Country.json file not found in directory ${path.join(sourceDir, country)}`);
      }
      grunt.log.writeln("");
    });
    fs.writeFileSync(RootIndexFilePath, rootIndexFileContent);
  });
};
