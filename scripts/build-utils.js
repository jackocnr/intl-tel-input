// Replacement for the grunt closure-compiler:utils target.
// Mirrors the gulp/grunt plugin's exact code path: feeds src/js/utils.js as
// JSON via stdin (--json_streams IN), and passes the rest of the source list
// via --js flags. Uses the native binary, no Java required.
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const Compiler = require('google-closure-compiler/lib/node/closure-compiler.js');
const { getNativeImagePath } = require('google-closure-compiler/lib/utils.js');

const entrySource = fs.readFileSync('src/js/utils.js', 'utf8');

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
  js_output_file: 'build/js/utils.js',
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
  console.log('Built build/js/utils.js');
});
