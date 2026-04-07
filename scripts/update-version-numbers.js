import fs from 'node:fs';

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

const replacements = [
  {
    files: [
      'site/src/docs/markdown/options.md',
      'site/src/docs/markdown/getting_started.md',
    ],
    match: /intl-tel-input@([0-9.]+)\/build/g,
    replacement: `intl-tel-input@${version}/build`,
  },
  {
    files: ['.github/ISSUE_TEMPLATE/1_bug_report.yml'],
    match: /the latest version \(v[0-9]+\.[0-9]+\.[0-9]+\)/,
    replacement: `the latest version (v${version})`,
  },
  {
    // grunt bump already updates the top-level version in package-lock.json,
    // but not the "inner" one (around line 9), so do that here.
    files: ['package-lock.json'],
    match: /"name": "intl-tel-input",\n {6}"version": "[0-9]+\.[0-9]+\.[0-9]+"/,
    replacement: `"name": "intl-tel-input",\n      "version": "${version}"`,
  },
];

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
