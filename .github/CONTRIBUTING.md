# Contributing

I'm very open to contributions, big and small! For general instructions on submitting a pull request on GitHub, see these guides: [Fork A Repo](https://help.github.com/articles/fork-a-repo), and [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

## Table of Contents
- [Changes to the plugin](#changes-to-the-plugin)
- [Updating to a new version of libphonenumber](#updating-to-a-new-version-of-libphonenumber)
- [Updating the flag images](#updating-the-flag-images)
- [Adding a new translation](#adding-a-new-translation)

## Changes to the plugin

In order to build the project, you will first need to install [npm](https://www.npmjs.org), and then run `npm install` to install the project's dependencies. At this point, the included `demo.html` should be working, if you open it in your browser. Then you should make your changes in the `src` directory, and be sure to run the relevant build script before committing your changes - if you've modified the JS, you'll need to run `npm run build:js`, or if you've modified the CSS, it's `npm run build:css`.

## Updating to a new version of libphonenumber

### Step 1: Setup

We now include libphonenumber as a submodule within this repository. The first time you update your local intl-tel-input repo to include this change, you need to run `npm install` in the root intl-tel-input directory to install the new closure-compiler dependencies, and then run `git pull --recurse-submodules` to initialise the submodule (this will populate the third_party/libphonenumber directory).

### Step 2: Updating libphonenumber

First, cd into the libphonenumber submodule directory and checkout the required version tag e.g.

```Shell
  cd third_party/libphonenumber
  git fetch --tags
  git checkout v8.9.14
```

Then to build the new version of utils.js, cd back to the root of your intl-tel-input repo and run the build command:

```Shell
  cd ../..
  npm run build:utils
```

Then run the tests to make sure nothing has broken: `npm test`, commit the updated build/js/utils.js, and create a pull request on Github.

## Updating the flag images

We get our flags from the [flag-icons](https://github.com/lipis/flag-icons) project. If there is a problem with the flags, you'll need to raise it with them. When there is an update in that project that you want to pull into this project, you can update the npm package with `npm install flag-icons@VERSION --save-dev`, and then re-build the flag sprite images with `npm run build:img`. Once you've checked everything looks ok (e.g. by opening the included demo.html in your browser), you can then create a pull request on Github.

## Adding a new translation

If we don't currently support a language you need, it's easy to contribute this yourself - you only need to provide a handful of UI translation strings (e.g. the country search input placeholder text), as we automatically pull in the country names from the country-list project. The translation files can be found in src/js/intl-tel-input/i18n/. There is a directory for each language we support (e.g. "en" for "English"). Inside each of these directories, you will find 3 files: countries.ts which contains the (auto-generated) country name translations, interface.ts which contains the user interface translations, and index.ts (also auto-generated) which ties it all together. All you need to do to add a new translation is create a new language directory, create the interface.ts file and populate it with your translations, following the same pattern as the other languages e.g. see [the english version here](https://github.com/jackocnr/intl-tel-input/blob/master/src/js/intl-tel-input/i18n/en/interface.ts). If you haven't already, you will need to run `npm install` to install the project dependencies, and then you can run `npm run build:translations` to auto-generate the countries.ts for your new language, as well as the required build files, and then you can create a pull request on Github.
