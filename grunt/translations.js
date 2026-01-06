const fs = require('fs');
const path = require('path');
// ts-node allows us to require TypeScript files
require("ts-node").register();

module.exports = function(grunt) {
  grunt.registerTask('translations', 'Generate country translations', function() {
    const supportedLocalesDirectory = "src/js/intl-tel-input/i18n";
    const rootIndexFilePath = path.join(supportedLocalesDirectory, 'index.ts');
    let rootIndexFileContent = "//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n";

    //* Get list of translation locales that exist in this project.
    const supportedLocales = fs.readdirSync(supportedLocalesDirectory, { withFileTypes: true })
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);

    grunt.log.writeln(`Supported locales: ${supportedLocales.join(", ")}.\n`);

    //* For each supported locale: update the root index.ts file.
    supportedLocales.forEach(locale => {
      const translationFilePath = path.join(supportedLocalesDirectory, locale, 'index.ts');
      const translationExists = fs.existsSync(translationFilePath);

      //* If the interface file does not exist, skip the iteration.
      if (!translationExists) {
        grunt.log.writeln(`WARNING: Missing interface file: ${translationFilePath} - skipping this locale.\n`);
        return;
      }

      //* Add the locale export to the content of the root index.ts file
      rootIndexFileContent += `export { default as ${locale} } from "./${locale}";\n`;
    });
    fs.writeFileSync(rootIndexFilePath, rootIndexFileContent);
  });
};
