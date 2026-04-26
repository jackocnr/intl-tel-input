import fs from 'node:fs';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const replacements = [
  {
    files: [
      'site/src/docs/markdown/options.md',
      'site/src/docs/markdown/integrations.md',
      'site/src/docs/markdown/angular_component.md',
      'site/src/docs/markdown/react_component.md',
      'site/src/docs/markdown/svelte_component.md',
      'site/src/docs/markdown/vue_component.md',
    ],
    match: /intl-tel-input@[0-9]+\.[0-9]+\.[0-9]+\/dist/g,
    replacement: `intl-tel-input@${version}/dist`,
  },
  {
    files: ['.github/ISSUE_TEMPLATE/1_bug_report.yml'],
    match: /the latest version \(v[0-9]+\.[0-9]+\.[0-9]+\)/,
    replacement: `the latest version (v${version})`,
  },
  {
    files: ['CHANGELOG.md'],
    match: /e\.g\. v[0-9]+\.[0-9]+\.[0-9]+, update the URL accordingly, e\.g\. (https:\/\/github\.com\/jackocnr\/intl-tel-input\/releases\/tag\/)v[0-9]+\.[0-9]+\.[0-9]+/,
    replacement: `e.g. v${version}, update the URL accordingly, e.g. $1v${version}`,
  },
  {
    files: ['composer.json'],
    match: /"version": "[0-9]+\.[0-9]+\.[0-9]+"/,
    replacement: `"version": "${version}"`,
  },
];

// On major version bumps, prepend a new entry to CHANGELOG.md's breaking
// changes list.
const [, minor, patch] = version.split('.');
if (minor === '0' && patch === '0') {
  const file = 'CHANGELOG.md';
  const original = fs.readFileSync(file, 'utf8');
  const entry = `- v${version} https://github.com/jackocnr/intl-tel-input/releases/tag/v${version}\n`;
  if (original.includes(entry)) {
    console.log(`No changes in ${file}`);
  } else {
    const updated = original.replace(
      /(## Breaking changes\n\n)/,
      `$1${entry}`,
    );
    fs.writeFileSync(file, updated);
    console.log(`Updated ${file}`);
  }
}

for (const { files, match, replacement } of replacements) {
  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    const updated = original.replace(match, replacement);
    if (original !== updated) {
      fs.writeFileSync(file, updated);
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes in ${file}`);
    }
  }
}
