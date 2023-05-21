## Contributing

I'm very open to contributions, big and small! For general instructions on submitting a pull request on GitHub, see these guides: [Fork A Repo](https://help.github.com/articles/fork-a-repo), and [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

### Changes to the plugin

In order to build the project, you will first need to install [npm](https://www.npmjs.org), and then run `npm install` to install the project's dependencies (for now you must be using node v16 due to our node-sass dependency). At this point, the included `demo.html` should be working, if you open it in your browser. Then you should make your changes in the `src` directory, and be sure to run the build script before committing your changes - see below for more information on this.

In most cases, you will only need to make changes to the JavaScript, in which case you can just run `npm run build:js` to build the JavaScript before committing.

If you want to make changes to the CSS or the flags sprite, you will need to globally install a package called evenizer with `npm install -g evenizer` and ImageMagick (on MacOS you can do this with `brew install imagemagick`), then run `npm run build` to build all of the assets (warning: this can take a while), before committing.

### Updating to a new version of libphonenumber

#### Step 1: Setup

We now include libphonenumber as a submodule within this repository. The first time you update your local intl-tel-input repo to include this change, you need to run `npm install` to install the new closure-compiler dependencies, and then run `git pull --recurse-submodules` to initialise the submodule (this will populate the third_party/libphonenumber directory).

#### Step 2: Updating libphonenumber

First, cd into the libphonenumber submodule directory and checkout the required version tag e.g.

```
cd third_party/libphonenumber
git fetch --tags
git checkout v8.9.14
```

Then to build the new version of utils.js, cd back to the root of your intl-tel-input repo and run the build command:

```
cd ../..
npm run build:utils
```

Then run the tests to make sure nothing has broken: `npm test`, commit the updated build/js/utils.js, and create a pull request on Github.


### Updating the flag images

We get our flags from the region-flags project, which in turn pulls them in from Wikipedia. So cd into intl-tel-input/node_modules/region-flags and then do the following:

1. Install some depenencies. On MacOS use brew: `brew install wget dos2unix librsvg optipng`
2. Run the make-aliases command: `./make-aliases.sh` (Note: I got some "No such file or directory" warnings)
3. Run the download command: `./download-wp.sh` (Note: this kept freezing for me, so I had to keep doing ctrl+c and then re-running it)

Finally, the last time I did this (October 2018) there was a problem with the Cayman Islands flag (region-flags/png/KY.png) - it should be aprx 1200x600px, like the other flags, but was instead tiny (36x36px), so I replaced it with [the old one from the region-flags repo](https://github.com/behdad/region-flags/blob/gh-pages/png/KY.png).

At this point, you should be good to cd back to the project root directory, and re-build the images with `npm run build:img`, and then check everything looks ok, and create a pull request on Github.

If when building, you get an error in the "exec:evenizer" task, you may need to temporarily increase the ulimit by running this command: `ulimit -S -n 2048`
