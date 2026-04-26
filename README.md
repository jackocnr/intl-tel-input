# intl-tel-input monorepo

This repository hosts [intl-tel-input](https://intl-tel-input.com) and its official framework wrappers.

## Packages

| Package | npm |
| --- | --- |
| [`intl-tel-input`](packages/core) | [![npm](https://img.shields.io/npm/v/intl-tel-input.svg)](https://www.npmjs.com/package/intl-tel-input) |
| [`@intl-tel-input/react`](packages/react) | [![npm](https://img.shields.io/npm/v/@intl-tel-input/react.svg)](https://www.npmjs.com/package/@intl-tel-input/react) |
| [`@intl-tel-input/vue`](packages/vue) | [![npm](https://img.shields.io/npm/v/@intl-tel-input/vue.svg)](https://www.npmjs.com/package/@intl-tel-input/vue) |
| [`@intl-tel-input/angular`](packages/angular) | [![npm](https://img.shields.io/npm/v/@intl-tel-input/angular.svg)](https://www.npmjs.com/package/@intl-tel-input/angular) |
| [`@intl-tel-input/svelte`](packages/svelte) | [![npm](https://img.shields.io/npm/v/@intl-tel-input/svelte.svg)](https://www.npmjs.com/package/@intl-tel-input/svelte) |

For documentation, demos, and the docs site, see [intl-tel-input.com](https://intl-tel-input.com).

## Working in this repo

```sh
git submodule update --init --recursive
npm install
npm run build
npm test
```

All packages share a single version, locked in lockstep. Releases bump every package together via `npm run version:major|minor|patch`.

See [CHANGELOG.md](CHANGELOG.md) for release history.
