## Contributing

I'm very open to contributions, big and small! For general instructions on submitting a pull request on GitHub, see these guides: [Fork A Repo](https://help.github.com/articles/fork-a-repo), and [Creating a pull request from a fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/).

In order to build the project, you will first need to install [npm](https://www.npmjs.org), and then globally install a package called evenizer with `npm install -g evenizer`. Then run `npm install` to install the project's dependencies, and then you should be good to run `npm run build` to build the project. At this point, the included `demo.html` should be working. You should make your changes in the `src` directory and be sure to run `npm run build` again before committing.

Running `npm run build` can be quite slow - you can also run `npm run build:js` to just build the JavaScript (or `npm run build:css` for just CSS), and `npm test` to just run the tests.

If when building, you get an error in the "exec:evenizer" task, you may need to temporarily increase the ulimit by running this command: `ulimit -S -n 2048`
