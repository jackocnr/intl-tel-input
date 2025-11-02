# Contributing

I'm very open to contributions, big and small! For general instructions on submitting a pull request on GitHub, see these guides: [Fork A Repo](https://help.github.com/articles/fork-a-repo) and [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

## Table of Contents
- [Changes to the plugin](#changes-to-the-plugin)
- [Updating the flag images](#updating-the-flag-images)
- [Adding a new translation](#adding-a-new-translation)

## Changes to the plugin

### Setup

Once you have [forked the repository](https://help.github.com/articles/fork-a-repo) and checked out your fork on your local machine, you need to initialise the submodules with `git submodule update --init --recursive`, then run `npm install`, and then `npm run build`. You should now be able to open the included demo.html in your browser and have a working plugin!

### Making changes

Any time you make changes, you’ll need to rebuild the plugin. You can run `npm run watch` to do this automatically. Else you can manually run one of the build commands below:

- `npm run build` to build everything (slow)
  - Builds flag images, translations, CSS, and all of the JS (see below)
- `npm run build:js` to build all of the JS (slow)
  - Builds utils script, main plugin module, TS type declaration files, react/vue/angular components and demo bundles
- `npm run build:jsfast` to just build the JS needed for the demo/tests (fast)
- `npm run build:css` to just build the CSS (fast)
- And lots more - see [package.json "scripts" section](https://github.com/jackocnr/intl-tel-input/blob/master/package.json#L97-L114) for full list

### Tests

Run `npm test` to run all the tests. This uses the built JS files, so make sure you build the JS first.

## Updating the flag images

We get our flags from the [flag-icons](https://github.com/lipis/flag-icons) project. If there is a problem with the flags, you'll need to raise it with them. When there is an update in that project that you want to pull into this project, you can update the npm package with `npm install flag-icons@VERSION --save-dev`, and then rebuild the flag sprite images with `npm run build:img`. 

Once you've checked everything looks ok (e.g. by opening the included demo.html in your browser), you can then create a pull request on Github. _NOTE: since we removed the build files from the repo, the only changes you will be committing are in package.json and package-lock.json._

## Adding a new translation

If we don't currently support a language you need, it's easy to contribute this yourself - you only need to provide a handful of UI translation strings (e.g. the country search input placeholder text), as we automatically pull in the country names from the country-list project.

The translation files can be found in src/js/intl-tel-input/i18n/. There is a directory for each language we support (e.g. "en" for "English"). Inside each of these directories, you will find 3 files: countries.ts, which contains the (auto-generated) country name translations, interface.ts, which contains the user interface translations, and index.ts (also auto-generated), which ties it all together.

All you need to do to add a new translation is create a new language directory, create the interface.ts file and populate it with your UI translation strings, following the same pattern as the other languages e.g. see [the english version here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/intl-tel-input/i18n/en/interface.ts).

If you haven't already, you will need to run `npm install` to install the project dependencies, and then you can run `npm run build:translations` to auto-generate the countries.ts and index.ts for your new language. Once you have tested and confirmed that the new translations are working, you can create a pull request on GitHub.
