## Contributing
I'm very open to contributions, big and small! For general instructions on contributing to a project on Github, see this guide: [Fork A Repo](https://help.github.com/articles/fork-a-repo).

You will need to install [npm](https://www.npmjs.org) to build the project. You will also need [evenizer](https://github.com/katapad/evenizer) (`npm install -g evenizer`) and [imagemagick](http://www.imagemagick.org/) to generate retina flag sprites. Then run `npm install` to install Grunt and other dependencies, then you should be good to run `grunt build` to build the project. At this point, the included demo.html should be working. You should make your changes in the `src` directory and be sure to run `grunt build` again before committing.

Running `grunt build` can be quite slow - you can also run `grunt js` to just build the JavaScript, and `grunt jasmine` to just run the tests.

If when building, you get an error in the "exec:evenizer" task, you may need to temporarily increase the ulimit by running this command: `ulimit -S -n 2048`
