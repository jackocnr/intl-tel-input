## Contributing

I'm very open to contributions, big and small! For general instructions on contributing to a project on Github, see this guide: [Fork A Repo](https://help.github.com/articles/fork-a-repo).

You will need to install [npm](https://www.npmjs.org) to build the project. Then run `npm install` to install Grunt and other dependencies, then you should be good to run `npm run build` to build the project. At this point, the included `demo.html` should be working. You should make your changes in the `src` directory and be sure to run `npm run build` again before committing.

Running `npm run build` can be quite slow - you can also run `npm run build:js` to just build the JavaScript (or `npm run build:css` for just CSS), and `npm test` to just run the tests.

If when building, you get an error in the "exec:evenizer" task, you may need to temporarily increase the ulimit by running this command: `ulimit -S -n 2048`
