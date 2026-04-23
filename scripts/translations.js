import fs from 'node:fs';
import path from 'node:path';

const supportedLocalesDirectory = 'src/js/i18n';
const rootIndexFilePath = path.join(supportedLocalesDirectory, 'index.ts');

const localeToExportName = (locale) => {
  // Convert locale file names (e.g. "zh-hk") into valid JS identifiers (e.g. "zhHk").
  // Keep the first segment as-is, then capitalize the first letter of subsequent segments.
  const parts = String(locale)
    .trim()
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean);

  if (parts.length === 0) return '';

  const [first, ...rest] = parts;
  return first + rest.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('');
};

//* Get list of translation locales that exist in this project (flat .ts files, excluding index.ts and types.ts).
const supportedLocales = fs
  .readdirSync(supportedLocalesDirectory)
  .filter((file) => file.endsWith('.ts') && file !== 'index.ts' && file !== 'types.ts')
  .map((file) => file.replace(/\.ts$/, ''))
  .sort();

console.log(`Supported locales: ${supportedLocales.join(', ')}.\n`);

let rootIndexFileContent = '//* THIS FILE IS AUTO-GENERATED. DO NOT EDIT.\n';

for (const locale of supportedLocales) {
  const exportName = localeToExportName(locale);
  if (!exportName) {
    console.warn(`WARNING: Could not generate export name for locale: ${locale} - skipping this locale.\n`);
    continue;
  }
  rootIndexFileContent += `export { default as ${exportName} } from "./${locale}.js";\n`;
}

fs.writeFileSync(rootIndexFilePath, rootIndexFileContent);
