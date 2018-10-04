## Contributing

I'm very open to contributions, big and small! For general instructions on submitting a pull request on GitHub, see these guides: [Fork A Repo](https://help.github.com/articles/fork-a-repo), and [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

### Changes to the plugin

In order to build the project, you will first need to install [npm](https://www.npmjs.org), and then globally install a package called evenizer with `npm install -g evenizer`. Then run `npm install` to install the project's dependencies, and then you should be good to run `npm run build` to build the project. At this point, the included `demo.html` should be working. You should make your changes in the `src` directory and be sure to run `npm run build` again before committing.

Running `npm run build` can be quite slow - you can also run `npm run build:js` to just build the JavaScript (or `npm run build:css` for just CSS), and `npm test` to just run the tests.

If when building, you get an error in the "exec:evenizer" task, you may need to temporarily increase the ulimit by running this command: `ulimit -S -n 2048`

### Updating to a new version of libphonenumber

Create a new dir (e.g. ~/workspace/libphonenumber-tools) where you will clone the libphonenumber project and a few other dependencies, and cd into it, and then:

```
git clone https://github.com/googlei18n/libphonenumber
git clone https://github.com/google/closure-library
git clone https://github.com/google/closure-compiler
git clone https://github.com/google/closure-linter
git clone https://github.com/google/python-gflags
```

If you have already cloned these projects before and just need to update libphonenumber, simply cd into that project dir and checkout the required version tag e.g.

```
cd ~/workspace/libphonenumber-tools/libphonenumber
git checkout v8.9.14
```

Then to build the new version of utils.js:

1. Copy intl-tel-input/src/js/utils.js to libphonenumber/javascript/i18n/phonenumbers/demo.js
2. `ant -f libphonenumber/javascript/build.xml compile-demo`
3. Copy libphonenumber/javascript/i18n/phonenumbers/demo-compiled.js to intl-tel-input/build/js/utils.js

Then, back in intl-tel-input/ just commit the new utils.js, and create a pull request on Github.
