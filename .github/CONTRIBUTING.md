# Contributing

I'm very open to contributions, big and small! For general instructions on submitting a pull request on GitHub, see these guides: [Fork A Repo](https://help.github.com/articles/fork-a-repo), and [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

## Table of Contents
- [Changes to the plugin](#changes-to-the-plugin)
- [Updating the flag images](#updating-the-flag-images)
- [Adding a new translation](#adding-a-new-translation)

## Changes to the plugin

In order to build the project, you will first need to install [npm](https://www.npmjs.org) and then run `npm install` to install the project's dependencies.

If you want to try out a demo playground for the component:
1. Start the server by running `npm run server`.
2. Open the demo page in your browser at the address printed to your console.

**Tests**
- Run `npm test`.

**Any time you make changes, you’ll need to rebuild the plugin.** Most tests run against the builds, so after making changes, you’ll need to do a build before running tests.
- To do a complete build, run `npm run build`
- To build just the JS:
    - `npm run build:js` runs various checks (linting, etc.) and then builds.
    - `npm run build:jsfast` *just* builds the JS. This is useful when iterating and testing small changes. Make sure you eventually do a full build with all the checks, though!
- To build just the CSS, run `npm run build:css`.

## Updating the flag images

We get our flags from the [flag-icons](https://github.com/lipis/flag-icons) project. If there is a problem with the flags, you'll need to raise it with them. When there is an update in that project that you want to pull into this project, you can update the npm package with `npm install flag-icons@VERSION --save-dev`, and then rebuild the flag sprite images with `npm run build:img`. Once you've checked everything looks ok (e.g. by opening the included demo.html in your browser), you can then create a pull request on Github.

## Adding a new translation

If we don't currently support a language you need, it's easy to contribute this yourself - you only need to provide a handful of UI translation strings (e.g. the country search input placeholder text), as we automatically pull in the country names from the country-list project. The translation files can be found in src/js/intl-tel-input/i18n/. There is a directory for each language we support (e.g. "en" for "English"). Inside each of these directories, you will find 3 files: countries.ts, which contains the (auto-generated) country name translations, interface.ts, which contains the user interface translations, and index.ts (also auto-generated), which ties it all together. All you need to do to add a new translation is create a new language directory, create the interface.ts file and populate it with your translations, following the same pattern as the other languages e.g. see [the english version here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/intl-tel-input/i18n/en/interface.ts). If you haven't already, you will need to run `npm install` to install the project dependencies, and then you can run `npm run build:translations` to auto-generate the countries.ts for your new language, as well as the required build files. Once you have tested and confirmed that the new translations are working, you can create a pull request on GitHub.
