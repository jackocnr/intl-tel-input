// Replacement for grunt-bump. Steps:
//   1. Bump version in package.json + package-lock.json (no commit, no tag).
//   2. Run scripts/update-version-numbers.js so docs/issue-template/inner
//      package-lock entry are updated to match.
//   3. Stage everything, create the commit, and create the tag — all in one
//      atomic version commit (matching the old grunt bump-only/bump-commit flow).
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const level = process.argv[2];
if (!['patch', 'minor', 'major'].includes(level)) {
  console.error('Usage: node scripts/version-bump.js <patch|minor|major>');
  process.exit(1);
}

const run = (cmd, args) => execFileSync(cmd, args, { stdio: 'inherit' });

// 1. Bump version (no git side effects). `npm version` updates both
//    package.json and package-lock.json's top-level version.
run('npm', ['version', level, '--no-git-tag-version']);

// 2. Propagate version into docs / issue template / inner package-lock entry.
run('node', ['scripts/update-version-numbers.js']);

// 3. Commit + tag.
const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const tag = `v${version}`;

run('git', ['add', '-A']);
run('git', ['commit', '-m', tag]);
run('git', ['tag', tag]);

console.log(`\nCreated version commit and tag ${tag}.`);
console.log('Push with: git push && git push --tags');
