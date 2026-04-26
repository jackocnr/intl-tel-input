// Steps:
//   1. Bump version on root + every publishable workspace, locked in step.
//      Update each wrapper's "intl-tel-input" dependency to match.
//   2. Regenerate package-lock.json with --package-lock-only.
//   3. Run scripts/update-version-numbers.js so docs/issue-template are updated
//      to match.
//   4. Stage everything, create the commit, and create the tag — all in one
//      atomic version commit.
//   5. Push the tag — GitHub Actions (.github/workflows/publish.yml) picks it
//      up and publishes to npm.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

const level = process.argv[2];
if (!['patch', 'minor', 'major'].includes(level)) {
  console.error('Usage: node scripts/version-bump.js <patch|minor|major>');
  process.exit(1);
}

const run = (cmd, args) => {
  console.log(`\n> ${cmd} ${args.join(' ')}`);
  execFileSync(cmd, args, { stdio: 'inherit' });
};

// 1a. Bump the root package.json (also updates package-lock.json's top-level
//     version). --no-workspaces-update keeps workspace bumping out of this
//     call so we can do it explicitly below.
run('npm', ['version', level, '--no-git-tag-version']);

const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// 1b. Bump every publishable package to the same version, plus their
//     "intl-tel-input" dep in wrappers.
const publishablePackages = ['core', 'react', 'vue', 'angular', 'svelte'];
for (const name of publishablePackages) {
  const pkgPath = `packages/${name}/package.json`;
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.version = version;
  if (pkg.dependencies && pkg.dependencies['intl-tel-input']) {
    pkg.dependencies['intl-tel-input'] = `^${version}`;
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Bumped ${pkgPath}`);
}

// 2. Reflect the new versions in the lockfile.
run('npm', ['install', '--package-lock-only']);

// 3. Propagate version into docs / issue template.
run('node', ['scripts/update-version-numbers.js']);

// 4. Commit + tag.
const tag = `v${version}`;

run('git', ['add', '-A']);
run('git', ['commit', '-m', tag]);
run('git', ['tag', tag]);
run('git', ['push']);
run('git', ['push', '--tags']);

console.log(`\n${tag} committed, tagged, and pushed. GitHub Actions will publish to npm.`);
