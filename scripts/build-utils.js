// Builds src/js/utils.js with Closure Compiler: feeds it as JSON via stdin
// (--json_streams IN), and passes the rest of the source list via --js flags.
// Uses the native binary, no Java required.
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Compiler = require('google-closure-compiler/lib/node/index.js').default;
const { getNativeImagePath } = require('google-closure-compiler/lib/utils.js');

// Read entry source, then inject the libphonenumber enum name arrays from
// constants.ts. constants.ts is the single source of truth - utils.js
// references the arrays via /*__NUMBER_FORMATS__*/, /*__NUMBER_TYPES__*/,
// /*__VALIDATION_ERRORS__*/ placeholders that we replace with literal arrays
// here, before Closure compilation.
const constantsSource = fs.readFileSync('src/js/constants.ts', 'utf8');
const extractArray = (name) => {
  const re = new RegExp(`export const ${name} = \\[([\\s\\S]*?)\\] as const;`, 'm');
  const m = constantsSource.match(re);
  if (!m) {
    throw new Error(`build-utils: couldn't extract ${name} from constants.ts`);
  }
  const items = m[1]
    .split(',')
    .map((s) => s.trim().replace(/^"(.*)"$/, '$1'))
    .filter((s) => s.length > 0);
  return JSON.stringify(items);
};

let entrySource = fs.readFileSync('src/js/utils.js', 'utf8');
const replacements = {
  '["__NUMBER_FORMATS__"]': extractArray('NUMBER_FORMATS'),
  '["__NUMBER_TYPES__"]': extractArray('NUMBER_TYPES'),
  '["__VALIDATION_ERRORS__"]': extractArray('VALIDATION_ERRORS'),
};
for (const [token, value] of Object.entries(replacements)) {
  if (!entrySource.includes(token)) {
    throw new Error(`build-utils: utils.js missing placeholder ${token}`);
  }
  entrySource = entrySource.split(token).join(value);
}

const compiler = new Compiler({
  js: [
    'node_modules/google-closure-library/**.js',
    'third_party/libphonenumber/javascript/i18n/phonenumbers/**.js',
    '!third_party/libphonenumber/javascript/i18n/phonenumbers/demo-compiled.js',
    '!third_party/libphonenumber/javascript/i18n/phonenumbers/metadatafortesting.js',
    '!third_party/libphonenumber/javascript/i18n/phonenumbers/metadatalite.js',
    '!third_party/libphonenumber/javascript/i18n/phonenumbers/regioncodefortesting.js',
    '!third_party/libphonenumber/javascript/i18n/phonenumbers/**_test.js',
  ],
  entry_point: 'goog:i18n.phonenumbers.demo',
  compilation_level: 'ADVANCED_OPTIMIZATIONS',
  js_output_file: 'dist/js/utils.js',
  output_wrapper:
    'var _scope = {};\n(function () {%output%}).call(_scope);\nexport default _scope.utils;',
});

// Use the native binary, matching what the gulp plugin does.
compiler.JAR_PATH = null;
compiler.javaPath = getNativeImagePath();
if (!compiler.javaPath) {
  throw new Error(`No native closure-compiler binary for platform: ${process.platform}`);
}

// Match the gulp plugin: stream the entry file in as JSON via stdin.
compiler.commandArguments.push('--json_streams', 'IN');

const child = compiler.run();
child.stdin.write(JSON.stringify([{ src: entrySource, path: 'src/js/utils.js' }]));
child.stdin.end();

let stderr = '';
child.stderr.on('data', (d) => { stderr += d; process.stderr.write(d); });
child.on('exit', (code) => {
  if (code !== 0) {
    process.stderr.write(stderr);
    process.exit(code ?? 1);
  }
  console.log('Built dist/js/utils.js');
});
